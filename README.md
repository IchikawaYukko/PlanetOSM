# Planet.osm Mirror site frontend and updater.

* planetosm-frontend -> AWS Lambda function
    * Show Planet.osm mirror filelist and provide link to actual file
    * File list will be read from OpenStack Swift object storage

* planetosm-updater -> Docker container
    * Download Planet.osm from master server and save it to OpenStack Swift

# WARNING
PLEASE DO NOT PLACE updater ON AWS EC2 !!
AND DO NOT SAVE Planet.osm dump TO AWS S3 !!

AWS DATA TRANSFER COST IS !TOO EXPENSIVE! FOR HOST THIS MIRROR SITE!!
YOU MAY EASILY BECOME BANKRUPT!!

You can choose other cloud servise for host this mirror.

For example "ConoHa" (Japanese cloud service) provides FREE data transfer service for OpenStack Swift object storage.

Original author of this code (IchikawaYukko) uses that cloud server.
