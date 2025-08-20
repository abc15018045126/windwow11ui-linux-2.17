const path = require('path');
const { spawn } = require('child_process');
const { FS_ROOT } = require('./constants');

function launchExternalAppByPath(relativeAppPath, args = []) {
    try {
        // The relative path points to the app's main script. We need its directory for the CWD.
        const appPath = path.join(FS_ROOT, relativeAppPath);
        const appDir = path.dirname(appPath);

        const spawnArgs = ['.', ...args];
        console.log(`Attempting to launch external app from directory: ${appDir} with args: ${spawnArgs.join(' ')}`);
        
        const child = spawn(process.execPath, spawnArgs, {
            cwd: appDir, // Correctly set CWD to the app's directory
            detached: true,
            stdio: 'inherit',
        });

        child.on('error', (err) => {
            console.error(`Failed to start subprocess for ${appDir}. Error: ${err.message}`);
        });

        child.on('exit', (code, signal) => {
            if (code !== 0) {
                console.error(`Subprocess for ${appDir} exited with code ${code} and signal ${signal}`);
            }
        });

        child.unref();
        return true;
    } catch (error) {
        console.error(`Error launching external app for path ${relativeAppPath}:`, error);
        return false;
    }
}

module.exports = { launchExternalAppByPath };