const path = require('path');
const { spawn } = require('child_process');
const { FS_ROOT } = require('./constants');

function launchExternalAppByPath(relativeAppPath, args = []) {
    try {
        const appDir = path.join(FS_ROOT, relativeAppPath);

        // The first argument to Electron should be the path to the app to launch.
        // We also add our custom flag to identify it as a child process.
        const spawnArgs = [appDir, '--launched-by-host', ...args];
        console.log(`Attempting to launch external app from directory: ${appDir} with args: ${spawnArgs.join(' ')}`);
        
        const child = spawn(process.execPath, spawnArgs, {
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