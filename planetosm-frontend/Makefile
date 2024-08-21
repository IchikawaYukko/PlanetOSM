# Make to AWS Lambda Layer zip file (pkgcloud)
all:	pkgcloud-layer.zip

pkgcloud-layer.zip:	nodejs/node_modules
	zip -1qr pkgcloud-layer.zip nodejs

nodejs/node_modules:	package-lock.json
	pushd nodejs/; npm install; popd
