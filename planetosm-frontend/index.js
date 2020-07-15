const pkgcloud = require('pkgcloud');
const credentials = {
    provider: 'openstack',
    username: '????????',
    password: '????????',
    tenantId: '????????',
    region: 'tyo1',
    authUrl: 'https://identity.tyo1.conoha.io/'
};
const settings = {
    "containerName": "PlanetOSM",
    "serviceUrl": "https://object-storage.tyo1.conoha.io/v1/nc_????????"
}

const getfilesPromise = (container, client) => new Promise ((resolve, reject) => {
    client.getFiles(container, (err, file) => {
        resolve(file);
    });
});

const getLatestFile = async (filterRegExp) => {
    let planetFiles = await getfilesPromise(
        settings.containerName,
        pkgcloud.storage.createClient(credentials)
    );

    planetFiles.sort( (a, b) => {
        if(a.lastModified < b.lastModified) return 1;
        if(a.lastModified > b.lastModified) return -1;
        return 0;
    });
    let filtered = planetFiles.filter( (value) => {
        return filterRegExp.test(value.name);
    });

    return {
        statusCode: 301,
        "headers": {
            "Location": `${settings.serviceUrl}/${settings.containerName}/${filtered[0].name}`
        }
    };
}

const getFileList = async () => {
    let planetFiles = await getfilesPromise(
        settings.containerName,
        pkgcloud.storage.createClient(credentials)
    );
    filelist = "<table>";
    for( file of planetFiles ) {
        filelist += `<tr><td><a href="${settings.serviceUrl}/${settings.containerName}/${file.name}">${file.name}</a></td><td>${file.lastModified}</td></tr>`;
    }
    filelist += `<tr><td><a href="planet-latest.osm.pbf">planet-latest.osm.pbf</a></td><td>LATEST</td></tr>`;
    filelist += `<tr><td><a href="planet-latest.osm.pbf.md5">planet-latest.osm.pbf.md5</a></td><td>LATEST</td></tr>`;
    filelist += "</table>";
    return filelist;
}

const getTopPage = async () => {
    html = "<html><head><title>Planet.osm.pbf Mirror (Tokyo, JAPAN) - PassportControl.net</title></head><body>";
    html += "<h1>Planet.osm Mirror (Tokyo, JAPAN)</h1><h2>by PassportControl.net</h2><hr>";
    html += await getFileList();
    html +="<hr><a href=\"http://passportcontrol.net\"> return to PassportControl.net</a></body></html>";

    return html;
}

exports.handler = async (event) => {
    switch (event.requestContext.resourcePath) {
        case '/planet-latest.osm.pbf':
            return await getLatestFile(/pbf$/);
        case '/planet-latest.osm.pbf.md5':
            return await getLatestFile(/md5$/);
        default:
            return {
                statusCode: 200,
                body: await getTopPage(),
                "headers": {
                    "content-type": "text/html"
                }
            };
    }
}
