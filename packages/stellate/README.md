# Stellate

## What is Stellate?

In short, Stellate is a GraphQL document cache—instead of hitting our GraphQL API directly, we can hit Stellate, which lets us specify cache rules for GraphQL queries. It also gives us a nice analytics dashboard.

For more info, see the [docs](https://docs.stellate.co/docs/intro-to-stellate).

## Services

We currently have two services—`formfunction-dev` and `formfunction-prod`.

These services sit in front of the dev and prod Hasura endpoints, respectively. Note that this means for certain queries (as specified by our [LD config](https://app.launchdarkly.com/default/production/features/graphqlUrlConfig/variations)), we will not hit Stellate, and instead hit either the Hasura Relay API or our remote schema directly. In the future, we may want to change this by creating additional Stellate services.

## Pushing and Pulling

In general, we should only modify Stella configs through the UI, which means we shouldn't need to push changes. In order to pull, just do something like:

```
cd dev && stellate pull --service formfunction-dev
```