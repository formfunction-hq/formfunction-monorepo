> :warning: **Branding and naming**
> By using this code, you agree that you will not copy and redistribute the work or any derivative version under the name “Formfunction” or “Formfunction, Inc.,” or use any associated logos or branding with the Formfunction brand. You must replace all written mentions or images in the codebase that are associated with the name Formfunction with your own name and imagery. You may not attempt to mislead people into thinking that your work is the original Formfunction website which has been closed down as of March 29, 2023.

<br/>

![](banner.jpeg)

<div align="center">
  <h1>Formfunction Monorepo</h1>
  <a href="#overview">Overview</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#setup">Setup</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#common-workflows">Common Workflows</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#development">Development</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#deployment">Deployment</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#workspace-settings">Workspace Settings</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#testing-pnfts-locally">Testing pNFTs Locally</a>
  <br />
  <hr />
</div>

## Overview

This is the code for Formfunction, an NFT marketplace created for independent artists and creators. The marketplace was [officially closed on March 29, 2023](https://www.blog.formfunction.xyz/blog/message-from-formfunction). However, any interested parties can fork this code in order to create a similar marketplace. This repository is meant to serve as a reference, and will NOT be actively maintained.

The general stack is as follows:
- Frontend: React, Relay, TypeScript, deployed with Cloudflare pages.
- Backend: AWS RDS for DB, Express for our webserver, Apollo for our custom GraphQL server, Hasura for an auto-generated GraphQL server + DB management + DB webhooks, Prisma for DB reads/writes, deployed via GitHub actions.
- Solana: we have a few Solana programs, see links below for more info.

The code for Formfunction's Solana programs can be found here:
- [Formfunction Auction House](https://github.com/formfunction-hq/formfunction-auction-house)—Solana program and TypeScript SDK that handles on-chain marketplace transactions (e.g. bidding, buying editions).
- [Formfunction Gumdrop](https://github.com/formfunction-hq/formfunction-gumdrop)—Solana program and TypeScript SDK for the participation NFT feature.
- [Formfunction Program Shared](https://github.com/formfunction-hq/formfunction-program-shared)—Various utils that the program repositories use.
- [Formfunction Campaign Treasury Manager](https://github.com/formfunction-hq/formfunction-campaign-treasury-manager)—Unfinished implementation of treasury management for campaigns.
- [Formfunction Candy Machine](https://github.com/formfunction-hq/formfunction-candy-machine)—A fork of Metaplex's Candy Machine that adds the ability to use a Merkle allowlist.

In order to get the code running locally, please follow the instructions below. You should be able to get it running in ~10 minutes or less.

In order to deploy this code, this information may be helpful. We used the following SaaS when running Formfunction (amongst other SaaS which aren't as relevant to this codebase):
- DigitalOcean for hosting the stateless servers
- AWS RDS for Postgres (Amazon RDS Aurora to be precise)
- Hasura for DB migrations/webhooks/GraphQL API/etc.
- Firebase for blob storage 
- Postmark for emails
- LaunchDarkly for feature flags
- Sentry for error reporting
- Grafana Loki for realtime logging
- Helius for Solana RPC
- Imgix and Mux for asset optimization
- Airplane for cron jobs
- Mixpanel for analytics

Of course, these can be swapped out for other options, and some (like DigitalOcean and RDS) do not affect the code at all. However, some of our code does assume we use certain SaaS (like LaunchDarkly and Sentry), so it will be easier to run this code if you use the same SaaS.

## Setup
> **NOTE**: all commands are assumed to be run from the repo root (unless explicitly stated otherwise) on NodeJS version `16.15.0`. We recommend using [`nvm`](https://github.com/nvm-sh/nvm) to manage NodeJS versions.

**1) If cloning for the first time:**

1. Install yarn if you don't have it: `npm install --global yarn`
2. Run `yarn` to install packages
3. Run the frontend: `yarn start-frontend`

- NOTE: it is expected for this to not work until the server is fully set up

4. Set up the server: follow these [instructions](https://github.com/formfunction-hq/formfunction-monorepo/tree/main/packages/server#readme)

5. Run `git config core.hooksPath .husky` to set up Husky (which we use for commit hooks)
6. Add your Wallet address to `getEmployeeWallets` in `packages/frontend/src/utils/getEmployeeWallets.ts`. This is used for connecting local frontend to the prod server using the link `http://localhost:3000/?pointToProd=1`.
7. Also add your wallet address here https://app.launchdarkly.com/default/local/features/teamWallets/variations. This will allow you to connect our dev evironment to prod server using the link `https://dev.formfunction.xyz/?pointToProd=1`.

**2) Install [Graphite](https://docs.graphite.dev/guides/graphite-cli/installing-the-cli)**

- We use Graphite for code reviews and merging changes. It allows us to easily [stack](https://docs.graphite.dev/getting-started/why-use-stacked-changes) changes and stay unblocked while code reviews are in progress.
- Once installed, run `gt repo ignored-branches --add prod` to ensure Graphite doesn't track the `prod` branch

## Common Workflows

> **NOTE**: all commands are assumed to be run from the repo root (unless explicitly stated otherwise) on NodeJS version `16.15.0`. We recommend using [`nvm`](https://github.com/nvm-sh/nvm) to manage NodeJS versions.

### 1) Typical E2E GraphQL Change

1. Update GraphQL schema on backend
   1. Update files in `packages/server/src/schema/...` if you need to update our custom GraphQL server (Apollo)
   2. Otherwise, update the DB through Hasura console
   3. For both cases, run `yarn fix-server` to update the server
2. Update GraphQL schema on frontend by running `yarn frontend gen-graphql`
3. Write queries/mutations in frontend code
4. Run `yarn frontend relay` to generate Relay code

**Common issues**

- **Backend schema won't update** - the easiest way to verify this is to either:
  - <u>If updating custom GraphQL server</u>: check `http://localhost:4000/graphql` to see if your changes are reflected
  - <u>If updating Hasura</u>: check `http://localhost:9695/console/api/api-explorer` to see if your changes are reflected
  - If changes are not being reflected, there's most likely an issue with your server (try re-running `yarn start-server`)
- **Frontend schema won't update** - typically this is because the backend server is not updating properly
  - You can try going to `http://localhost:9695/console/remote-schemas/manage/schemas` and clicking `Reload` for `express-schema`
- **Relay codegen doesn't work** - typically this is due to errors in the queries/mutations or because the frontend schema did not update; the error message should give some hints
- **Pulling `main` results in type errors** - this usually happens if your server isn't running when you pull, leading to pull hooks failing and codegen not being updated.
  - try to `yarn fix-server`. this may not work due to the type errors, in which case:
  - `yarn swc` in `packages/server/`, then `yarn start-server` in root, then try `yarn fix-server` again in a separate terminal window
- **You randomly end up with a lot of **generated** files in your git diff (generally when switching branches)** - if your Relay compiler was on --watch, restarting the compiler will often clear the git diff.
- If the commit hooks hang after pulling `main` with a message like `INFO A new version (v2.13.0) is available for CLI, update? (y/N)` you can separately later run the `hasura update-cli` command to update the Hasura CLI.

## Development

> **NOTE**: all commands are assumed to be run from the repo root (unless explicitly stated otherwise) on NodeJS version `16.15.0`. We recommend using [`nvm`](https://github.com/nvm-sh/nvm) to manage NodeJS versions.

If you've already done the initial setup above, do the following:

- **Shared modules**: `yarn shared tsc` to build (do this first)
- **Server**: `yarn start-server`
  - To get changes to propagate to your local server, run `yarn server swc`
  - If you encounter issues, try running `yarn fix-server` as a first step
  - More troubleshooting instructions are available [here](https://github.com/formfunction-hq/formfunction-monorepo/tree/main/packages/server#readme)
- **Frontend**: `yarn start-frontend`

## Deployment

We use a combination of Github Actions and Cloudflare Pages to deploy our stack:

- **Server**: Github Actions that run based on pushes to `main` or `prod` (see `.yml` files in `.github/workflows` for more details)
- **Frontend**: We use Cloudflare Pages which pulls and builds our CRA app and deploys on Cloudflare. Specifically, we have Github Actions that trigger these builds either on their own or after a successful server build is complete.

All pushes to `main` will deploy our `dev` stack automatically. The `dev` site can be accessed by going to [dev.formfunction.xyz](dev.formfunction.xyz).

### Pushing to Prod

#### Step 1: Run basic checks on dev

Go to [dev](dev.formfunction.xyz) and manually test functionality as necessary.

#### Step 2: Push

Before starting, ensure that you have no pending changes (i.e., clean working directory) on `main` and `prod`.

Run the following steps to push to prod:

- `git checkout main`
- `git pull`
- `git checkout prod`
- `git pull`
- `git rebase main`
- `git push -f --no-verify`

Finally, go to the [prod branch](https://github.com/formfunction-hq/formfunction-monorepo/tree/prod) and check that you see:

> This branch is up to date with main.

If not, [cancel the latest deployment](https://github.com/formfunction-hq/formfunction-monorepo/actions).

**Hygiene:**

- All changes should be pushed to `main` first and pushes to `prod` must only be done by rebasing `main`
- As a corollary:
  - `prod` should always be behind or caught up with `main`, **never ahead**
  - `prod` and `main` should never diverge (i.e., should maintain the same history)
- To prevent accidental pushes to `prod` we have a `pre-push` hook that will stop pushes without `--no-verify`

### Hotfixing

- Sometimes we may need to push a single change to `prod` without rebasing all of `main`
  - e.g., `main` has a lot of commits and we don't want to potentially introduce more changes on top of `prod` that's already broken
- In cases like this, the following steps can be taken:

1. Push the commit with the fix onto `main`
2. Checkout `main` and ensure `main` is in sync with `origin/main` (i.e., `git pull --rebase`)
3. Checkout `prod` and run `git cherry-pick <commit hash>` with the hash of the fix commit
4. Run `git push -f --no-verify` to push the commit to `prod`

Once we're ready to push the remainder of `main` to `prod`, we should take the following steps:

1. Checkout `main` and pull latest
2. Checkout `prod` and run `git reset --hard HEAD~1` (this ensures that your local copy of `prod` is at the state **prior** to pushing the hotfix)
3. Run `git rebase main`
4. Run `git push -f --no-verify`

## Workspace Settings

There are a few specific VS Code settings configured in the `.vscode/` folder which should provide some conveniences for development. These include:

- `typescript-plugin-css-modules` plugin setup to help type-check CSS class names in React code.
- Some recommended extensions such as `css-sort-classname` which can help to sort CSS files alphabetically by classname.

These should work out of the box with no additional configuration for VS Code users.

## Testing pNFTs Locally

The pNFTs feature relies on some Airplane jobs to work correctly. However, these jobs don't run on `localhost`! So how do you test pNFTs locally?

1. First, make sure `GUMDROP_CONFIG_AUTHORITY` is set to the correct value in `packages/server/.env`. This will ensure the `auctionWonUpdatePnftDrop` Hasura webhook works properly. Use [this key for devnet](https://github.com/formfunction-hq/formfunction-gumdrop/blob/main/keys/devnet/config-authority-keypair.json).
2. Then run `yarn server process-finished-auctions`. This will populate the `Claim` table.
3. Finally, run `yarn server process-finished-pnft-drops`. This will close any distributors which need to be closed.
4. If you want to hit the `updateDistributorForAuctionMint` endpoint to manually update a distributor for an auction you can run `curl --header "check: fofu" -X POST http://localhost:4000/intern/updateDistributorForAuctionMint -H "Content-Type: application/json" -d '{ "mint": "<auction-nft-mint>" }'`.
