# formfn-website

Website: https://formfunction.xyz

## Dev environment setup

See setup instructions in top-level README.

## Relay

You should run `yarn relay --watch` during development, so that Relay can pick up any changes to your queries/mutations/fragments, and generate the appropriate code.

If you make a change to the GraphQL schema, run `yarn gen-graphql` and then re-run `yarn relay --watch`.

## Misc. Tips

* To point the frontend to the production backend go to: http://localhost:3000/?pointToProd=1.
  * Must add your wallet address to `getEmployeeWallets.ts`
* For the dev backend use: http://localhost:3000/?pointToDev=1
* If you find stale ESLint warnings in the terminal output when running the frontend dev server, running this command may fix the problem: `rm node_modules/.cache/.eslintcache`.
* If you get an error from watchman when running Relay such as `[ERROR] Watchman error: The watchman server reported an error: ... Operation not permitted` you can try to run `watchman watch-del-all` and then `watchman shutdown-server`.