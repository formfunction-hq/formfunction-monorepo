#!/bin/sh

# Initialise option flag with a false value
OPT_VERBOSE='false'

# Process all options supplied on the command line
while getopts ':at' 'OPTKEY'; do
    case ${OPTKEY} in
        'v')
            OPT_VERBOSE='true'
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

if [ "$OPT_VERBOSE" = "true" ]
then
  echo "Since -v was specified, showing all script output.\n" &&
  hasura update-cli &&
  yarn wait-server &&
  yarn &&
  yarn server hasura-migrate &&
  yarn server gen-prisma &&
  yarn shared tsc &&
  yarn server swc &&
  sleep 4 &&
  yarn wait-server &&
  yarn server hasura-reload &&
  yarn server remote-schema-reload &&
  yarn update-local-exchange-rates
else
  echo "Omitting output from fix-server steps. Use -v or run 'yarn fix-server-verbose' to see all output.\n" &&
  echo "Updating Hasura CLI..." &&
  hasura update-cli >/dev/null 2>&1 &&
  echo "Waiting for server restart..." &&
  yarn wait-server >/dev/null 2>&1 &&
  echo "Installing packages..." &&
  yarn >/dev/null 2>&1 &&
  echo "Running Hasura migrations..." &&
  yarn server hasura-migrate >/dev/null 2>&1 &&
  echo "Generating Prisma client..." &&
  yarn server gen-prisma >/dev/null 2>&1 &&
  echo "Compiling TS code..." &&
  yarn shared tsc >/dev/null 2>&1 &&
  yarn server swc >/dev/null 2>&1 &&
  sleep 4 >/dev/null 2>&1 &&
  echo "Waiting for server restart..." &&
  yarn wait-server >/dev/null 2>&1 &&
  echo "Reloading Hasura..." &&
  yarn server hasura-reload >/dev/null 2>&1 &&
  echo "Reloading remote schema..." &&
  yarn server remote-schema-reload >/dev/null 2>&1 &&
  echo "Updating exchange rates..." &&
  yarn update-local-exchange-rates >/dev/null 2>&1 &&
  echo "Success!"
fi
