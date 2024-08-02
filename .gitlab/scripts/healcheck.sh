#!/bin/bash
STATUS=$(docker ps | grep 'health:' | cut -d '(' -f2)
STATUS=$(echo $STATUS | cut -d ')' -f1)
echo $STATUS
while true; do
    if [[ "$STATUS" == "" ]]; then
                break
    fi
    sleep 10
    STATUS=$(docker ps | grep 'health:' | cut -d '(' -f2)
    STATUS=$(echo $STATUS | cut -d ')' -f1)
    echo $STATUS
done
STATUS=$(docker ps | grep 'unhealthy' | cut -d '(' -f2)
STATUS=$(echo $STATUS | cut -d ')' -f1)
if [[ "$STATUS" == "unhealthy" ]]; then
    STATUS=$(docker ps | grep 'unhealthy' | cut -d '(' -f2)
    STATUS=$(echo $STATUS | cut -d 'tcp ' -f2)
    STATUS=$(echo $STATUS | cut -d ' unhealthy' -f1)
    docker logs $STATUS
    exit
fi
