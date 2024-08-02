#!/bin/bash
NAMES=$(cat ../../docker-compose.yml  | grep container_name: | cut -d: -f2)
while [[ "$NAMES" != "" ]]; do
LAST_NAME=$(echo $NAME)
NAME=$(echo $NAMES | cut -d ' ' -f1)
if [[ "$LAST_NAME" == "$NAME" ]]; then
     break
fi
echo $NAME
STATUS_CONTAINER=$(docker inspect --format '{{ .State.Running }}' $NAME)
if [[ "$STATUS_CONTAINER" != "true" ]]; then
    docker logs $NAME
    exit 1
fi
NAMES=$(echo $NAMES | cut -f2- -d ' ')
done

