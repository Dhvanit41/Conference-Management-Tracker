import fs from 'fs/promises';
import path from 'path';
import TrackManagementService from './services/trackManagementService';

const start = async () => {
  const testFiles = await fs.readdir(path.join(__dirname, '..', 'test-files'));

  Promise.all(
    testFiles.map(async (file) => {
      const content = await fs.readFile(path.join(__dirname, '..', 'test-files', file), 'utf8');
      try {
        const trackManagementService = new TrackManagementService();
        trackManagementService.getValidConferenceList(content.split('\n'));
        trackManagementService.computeTracks();
        trackManagementService.displayTracks();
      } catch (error) {
        let errorMessage = 'Failed to do something exceptional';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log(errorMessage);
      }
    })
  );
};

start();
