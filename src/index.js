const fs = require('fs/promises');
const path = require('path');

const start = async () => {
    const testFiles = await fs.readdir(path.join('..', 'test-files'));
    for (let file of testFiles) {
        const content = await fs.readFile(path.join('..', 'test-files', file), 'utf8');
        //TODO: check content
        const trackManagementService = new TrackManagementService();

    }
}

start()