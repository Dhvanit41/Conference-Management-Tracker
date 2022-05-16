const fs = require('fs/promises');
const path = require('path');
const TrackManagementService = require('./services/trackManagementService');

const start = async () => {
    const testFiles = await fs.readdir(path.join('..', 'test-files'));
    for (let file of testFiles) {
        const content = await fs.readFile(path.join('..', 'test-files', file), 'utf8');
        try {
            const trackManagementService = new TrackManagementService();
            trackManagementService.getValidConferenceList(content.split('\n'));
        } catch (error) {
            console.error(`${error.message}\n`);
        }
    }
}

start()