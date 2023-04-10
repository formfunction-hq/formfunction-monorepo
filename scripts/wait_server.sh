#!/bin/bash

MAX_WAIT=120

count=0

# Sleep for 1 second to make sure server has had a chance to restart
sleep 1

curl 127.0.0.1:4000 &> /dev/null || echo "Server not running, waiting for restart ($MAX_WAIT seconds)..."
until curl 127.0.0.1:4000 &> /dev/null
do
    ((count++))
    if [[ count -gt $MAX_WAIT ]]; then
      echo "Exceeded max wait limit of $MAX_WAIT seconds. Please check server status."
      break
    fi
    sleep 1
    echo "..."
done
