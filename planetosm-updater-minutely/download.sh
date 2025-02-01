#!/bin/bash

MIRROR_URL=https://planet.maps.mail.ru/replication/minute

mkdir -p $(./slashfy.sh $1|./split_dir.sh)
wget $MIRROR_URL/$(./slashfy.sh $1).osc.gz -O $(./slashfy.sh $1).osc.gz

