#!/bin/sh

# Initialise option flag with a false value
OPT_A='false'
OPT_T='false'

# Process all options supplied on the command line 
while getopts ':at' 'OPTKEY'; do
    case ${OPTKEY} in
        'a')
            OPT_A='true'
            ;;
        't')
            OPT_T='true'
            ;;
        '?')
            echo "INVALID OPTION -- ${OPTARG}" >&2
            exit 1
            ;;
        *)
            echo "UNIMPLEMENTED OPTION -- ${OPTKEY}" >&2
            exit 1
            ;;
    esac
done

if [ "$OPT_T" = "true" ]
then
  echo "Since -t was specified, running tests as part of checks"
else
  echo "Omitting tests from checks; please run with -t to include tests"
fi

if [ "$OPT_A" = "true" ]
then
  echo "Since -a was specified, running checks regardless of changes"
fi
echo ""

if git diff --cached --name-only | grep --quiet "packages/shared" | [ "$OPT_A" = "true" ]
then
  [ "$OPT_A" = "true" ] && echo "Running shared checks..."
  [ "$OPT_A" = "false" ] && echo "Detected shared module changes; running shared checks..."
  yarn shared tsc
  yarn shared eslint
  [ "$OPT_T" = "true" ] && yarn shared test
else
  echo "No shared changes detected; skipping check..."
fi

if git diff --cached --name-only | grep --quiet "packages/server/src/__generated__/generated.graphql"
then
  echo "Detected server GraphQL schema changes; checking for backwards compatibility..."
  yarn server get-main-graphql
  yarn server check-graphql || { yarn server rm-main-graphql; printf "\n***Breaking changes detected in GraphQL schema changes! Exiting...***\n"; exit 1; }
  yarn server rm-main-graphql
else
  echo "No GraphQL schema changes detected; skipping check..."
fi

if git diff --cached --name-only | grep --quiet "packages/server" || git diff --cached --name-only | grep --quiet "packages/shared" | [ "$OPT_A" = "true" ]
then
  [ "$OPT_A" = "true" ] && echo "Running server checks..."
  [ "$OPT_A" = "false" ] && echo "Detected server/shared changes; running server checks..."
  yarn server tsc
  yarn server eslint
  [ "$OPT_T" = "true" ] && yarn server test
else
  echo "No server changes detected; skipping check..."
fi

if git diff --cached --name-only | grep --quiet "packages/frontend" || git diff --cached --name-only | grep --quiet "packages/shared" | [ "$OPT_A" = "true" ]
then
  [ "$OPT_A" = "true" ] && echo "Running frontend checks..."
  [ "$OPT_A" = "false" ] && echo "Detected frontend/shared changes; running frontend checks..."
  yarn frontend relay
  yarn frontend tsc
  yarn frontend eslint
  [ "$OPT_T" = "true" ] && yarn frontend test
else
  echo "No frontend changes detected; skipping check..."
fi
