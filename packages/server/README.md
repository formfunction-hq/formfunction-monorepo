# formfn-server

## Dev environment setup

### Initial setup (should only need to do once, after pulling repo)

* Pre-requisites:
  * [Install Docker](https://docs.docker.com/engine/install/)
  * Install [Phantom Wallet](https://phantom.app/)
  * Install the [Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli/)

**💡 NOTE:** run all these steps in `formfn-monorepo`

1. **Copy Env vars**: 
  * Run `cp packages/server/.env.local packages/server/.env`
2. **Start Docker containers for server and DB**: Run `yarn start-server`. 
  * Make sure you give Docker permission to read your `Documents` folder in System Preferences! Otherwise, you may run into errors like `Error: EPERM: operation not permitted`.
3. **Initial DB setup:**
  * `export HASURA_GRAPHQL_ADMIN_SECRET=771043a6-2176-4cd6-9831-591ceca0ad5z`
  * `yarn server hasura-migrate && yarn server hasura-reload`
  * `yarn server hasura-console`
4. **Generate Prisma (ORM) client**: 
  * First, install [`gsed`](https://formulae.brew.sh/formula/gnu-sed)
  * Then run `yarn server gen-prisma`
5. **Build TypeScript modules**: 
  * Run `yarn tsc`. 
6. **Wait for server to reload**: 
  * Wait until you see `Server listening at http://0.0.0.0:4000` in the Docker logs in your terminal
  * Then, run `yarn server hasura-reload` again
  * NOTE: if you encounter problems, re-run the Docker containers (step 2)
7. **Pull latest exchange rates**: 
  * Run `yarn update-local-exchange-rates`
8. Create an account via the frontend (Sign in and fill out modal)
9. Add that account's address to the `Whitelist` table ("Insert Row") via Hasura console 

### Misc. steps

- Ping the `#eng` channel in Slack and ask someone for help to fill in the rest of the secrets as needed
  - Fill in `AUTHORITY` and `GUMDROP_CONFIG_AUTHORITY`

### Running stuff

1. `yarn start-server` from `formfn-monorepo`
2. If you make changes, just run `yarn swc` locally (you don't need to re-build/re-run), and your changes will propagate to the container. We use `swc` for development because it is much faster than `tsc`. Note that `swc` is only for transpilation, i.e. generating JS files from TS files. It does not do any type checking, so `tsc` is still important to use if you want to make sure your types are valid.

### Post-merge (`git pull`) steps

- Most things should be done automatically for you with post-merge Git hooks in place
- If a new package is installed, you'll need to re-build the Docker image by following the [Running stuff](#running-stuff) instructions
- Pay close attention to the console messages from the post-merge steps! Most warnings/errors should be addressed in the below [Troubleshooting](#troubleshooting) section.

## Troubleshooting

### `hasura migrate apply` responds with `nothing to apply`

I was running into this error for a while when trying to run `hasura migrate apply`:

```
formfn-server/hasura-project $ hasura migrate apply --endpoint http://localhost:8080/
✔ formfn
INFO nothing to apply
```

Fixed by running `hasura migrate delete --all` and then re-adding back the migration files (i.e., `git restore migrations/*`). I think the problem was that Hasura thought the migrations were already applied (but they weren't).

You can also get around this by renaming the migration folders.

### Hasura complains about remote_schema being inconsistent

Sometimes after applying new DB changes, you may get an error like `Inconsistent object: HTTP exception occurred while sending the request to http://host.docker.internal:4000/graphql`.

The simplest solution is to re-run the steps in [Running stuff](#running-stuff) and then reloading the remote schema in the Hasura console.

### `docker-compose` issues

#### `Error: Cannot find module '/usr/src/app/dist/src/index.js'`

If you run into this issue, the most likely culprit is that there's something wrong with the `yarn tsc` step.

For now, this can likely be bypassed by [installing Typescript locally](https://www.typescriptlang.org/download)

### `yarn fix-server` (hasura migrate) fails

#### `"error": "restricted access : admin only"`

This most likely means that your hasura admin secret needs to be (re)exported
To fix, run the export command again.

- `export HASURA_GRAPHQL_ADMIN_SECRET=<secret from docker-compose-dev.yaml>`
- Alternatively, add the above variable to your `.bashrc` for a more permanent solution

## Hasura migrations

NOTE: this stuff is not really necessary, because we apply migrations in a GitHub action (`main-deploy.yml`). Leaving here because it's still kinda useful to see all the commands.

Mostly following https://hasura.io/docs/latest/graphql/core/migrations/migrations-setup.html

### Initial migration

1. Disable the console by setting `HASURA_GRAPHQL_ENABLE_CONSOLE` to `"false"` in `docker-compose.yaml`. ALSO, set the `HASURA_GRAPHQL_ADMIN_SECRET` env variable, otherwise all the commands below will ask for it
1. Install the Hasura CLI.
1. Set up a project directory with `hasura init hasura-project --endpoint http://localhost:8080/`. Then, run `cd hasura-project`
1. Create migration files `hasura migrate create "init" --from-server --database-name formfn`.
   - `INFO Migrations files created name=init version=1640235527703`
1. Mark migration as applied `hasura migrate apply --version "1640235527703" --skip-execution --database-name formfn`
1. Export Hasura metadata `hasura metadata export`
1. Now, when making changes, run `hasura console`
1. To apply changes in prod:
   - Apply metadata `hasura metadata apply --endpoint https://graphql.formfn.com/`
   - Apply migrations `hasura migrate apply --all-databases --endpoint https://graphql.formfn.com/`
   - Reload metadata `hasura metadata reload --endpoint https://graphql.formfn.com/`
1. Remember to change endpoints of actions and events to use `api.formfn.com` instead of `localhost` (should really use environment variables for this though...)

NOTE: it's ok to enable the console on the prod server, because running `hasura console` doesn't work on there (see https://github.com/hasura/graphql-engine/issues/2824). So as long as no data is modified using the console, which shouldn't happen anyways (we should modify the devdb and then apply migrations), it's fine.

### Subsequent migrations

1. Squash migrations into single file `hasura migrate squash --name "image library" --from <start-migration-version> --database-name formfn`
1. [Only necessary if you squash] Mark migration as applied `hasura migrate apply --version "<squash-migration-version>" --skip-execution --database-name formfn`
1. `npx prisma introspect && npx prisma generate`
1. Commit changes
1. Pull changes on prod server
1. Apply metadata `hasura metadata apply --endpoint https://graphql.formfn.com/`
1. Apply migrations `hasura migrate apply --endpoint https://graphql.formfn.com/ --version LAST_MIGRATION_VERSION`
1. Reload metadata `hasura metadata reload --endpoint https://graphql.formfn.com/`
1. `docker build` and `docker-compose up` (for Prisma). Otherwise webhook for action doesn't work? TODO: not sure why, figure it out.

## Setting up new Hasura project + Amazon RDS DB

1. Follow [these instructions](https://hasura.io/docs/latest/graphql/cloud/getting-started/cloud-databases/aws-postgres.html#step-2-create-a-postgres-db-on-aws-skip-if-you-have-an-existing-db)
2. `hasura metadata apply --endpoint https://graphqldev.formfunction.xyz/ --admin-secret SECRET`
3. `hasura migrate apply --endpoint https://graphqldev.formfunction.xyz/ --admin-secret SECRET`
   - NOTE: if you are creating a second Hasura project for the same DB, you should run `hasura migrate apply --skip-execution --up all --endpoint ENDPOINT --admin-secret SECRET` instead
4. `hasura metadata reload --endpoint https://graphqldev.formfunction.xyz/ --admin-secret SECRET`

## Starting over with a clean DB

1. See below for how to nuke the DB
2. `cd hasura-project`
3. `hasura migrate delete --all --endpoint http://localhost:8080 --admin-secret SECRET`
4. `git checkout migrations`
5. `hasura metadata clear --endpoint http://localhost:8080 --admin-secret SECRET`
6. `hasura metadata apply --endpoint http://localhost:8080 --admin-secret SECRET`
7. `hasura migrate apply --endpoint http://localhost:8080 --admin-secret SECRET`
8. `hasura metadata reload --endpoint http://localhost:8080 --admin-secret SECRET`

## Interacting directly with the Postgres DB (dev)

```
formfn/formfn-server $ docker exec -it formfn-postgres bash
root@8201a2fb0709:/# psql -U postgres formfn
psql (12.7 (Debian 12.7-1.pgdg100+1))
Type "help" for help.

formfn=#
```

### Nuking the DB

```
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

Then, run `\d` to check that there are no tables.

## Creating last bid price (manually)

```
curl -X POST http://localhost:4000/intern/createLastBidPrice -d '{"mint": "PDvDtvhZy8gXJMJ9P7Aq2DE1pG8CLrj2npxR39LPPFA"}' --header "Content-Type: application/json" --header "check: fofu"
```

## Misc

Using `jest.config.ts` messes with Docker

```
import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  moduleDirectories: ["node_modules", "."],
  verbose: true,
};

export default config;
```

Specifically, the `moduleDirectories` line makes it so that in the Docker image, the file structure is `dist/src/src/...` instead of just `dist/src`. Idk why, but using CL args instead of the config file fixes it.

## Adding a new table to the DB

We have Prisma + Hasura + Relay setup but the actual schema changes are generated through Hasura.

While you could add things by hand, you will need to also write up/down SQL migration besides Prisma schema and Hasura metadata files. Thus recommended way to do this is through the Hasura console.

<details>
  <summary>Creating a table via Hasura console</summary>
   1. First, go to the Data tab and select DB schema (public) on the left and click 'Create table'

![image](https://user-images.githubusercontent.com/19464965/155895206-15529dad-ac56-42b9-a283-38e2aed1d780.png)

2.  UI for columns creation will pop up so you now could add all the columns you need (most of the options are common SQL things)
3.  After that you need to go to the Permissions tab of the created table. The best way to get some examples is to explore other tables' permissions, but most likely you will want to enable select/insert/delete for users and maybe some select for anonymous. (don't forget to update permissions if you add new columns to the table)

![image](https://user-images.githubusercontent.com/19464965/155895435-5988443a-bcc5-4b92-a9dc-40cbed19f068.png)

4.  That's it for Hasura UI, now your table is here but you need to generate all the code changes, see stuff below 👇
</details>

<details>
  <summary>Generating code for the new table created via Hasura console</summary>

1.  First, you need to generate GQL stuff for server `yarn server gen-types`
2.  Then run `yarn fix-server` to generate Prisma changes (or just `yarn server gen-prisma`).
3.  Now the frontend part - for basic GQL stuff you need to run `yarn frontend gen-graphql`
4.  And the final step is to generate Relay code via `yarn frontend relay`
5.  That's it! 🎉 Now you could start to use the new table in your code.

</details>

## Debugging With VSCode

To run the server in vs code.

- **Run Postgres**: Select Run Task (From the Terminal Menu or from command panel) and select the task "Run Postgres"
- **Run Hasura GraphQL Server**: Select Run Task (From the Terminal Menu or from command panel) and select the task "Run Hasura GraphQL Engine"
- **Launch the API**: From the Run menu, Select "Start Debugging"
- **Run Frontend**: Select Run Task (From the Terminal Menu or from command panel) and select the task "Run Frontend"

You can now set breakpoints anywhere in the API and they will work!

Please be warned that closing VSCode or stopping the tasks does not actually stop the docker containers. You will need to stop them manually using the tasks "Stop Postgres" and "Stop Hasura GraphQL Engine"
