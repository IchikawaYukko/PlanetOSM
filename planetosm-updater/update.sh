#!/bin/sh
cd /mnt/PlanetOSM
echo Deleting old dump...
find /mnt/PlanetOSM -type f -mtime +7
find /mnt/PlanetOSM -type f -mtime +7 -exec rm -f {} \;

echo Downloading...
time wget -nv --content-disposition https://planet.openstreetmap.org/pbf/planet-latest.osm.pbf
wget -nv --content-disposition https://planet.openstreetmap.org/pbf/planet-latest.osm.pbf.md5
find /mnt/PlanetOSM/ -type f -mtime -1 -name '*.pbf' -exec mv /mnt/PlanetOSM/planet-latest.osm.pbf.md5 {}.md5 \;

# verify checksum
echo Hashing...
DUMP_FILENAME=$(find -type f -mtime -1 -name '*.pbf')
HASH=$(md5sum $DUMP_FILENAME|cut -b -32)
HASH_DESIRED=$(find -type f -mtime -1 -name '*.pbf.md5' -exec cut -b -32 {} \;)

if [ $HASH != $HASH_DESIRED ]; then
    echo Hash Mismatch!!
    echo Calculated: $HASH
    echo Desired: $HASH_DESIRED
    exit 0;
fi

# Tweet
FILE=$(echo $DUMP_FILENAME|cut -b 3-)
twitter "新しい Planet.osm ダンプ $FILE が東京ミラー https://planet.passportcontrol.net/pbf/ にリリースされました！ #OpenStreetMap #osmjp (自動投稿)"
