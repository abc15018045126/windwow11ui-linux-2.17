const path = require('path');
const { spawn } = require('child_process');
const { FS_ROOT } = require('./constants');

function launchExternalAppByPath(relativeAppPath, args = []) {
    try {
        const appDir = path.join(FS_ROOT, relativeAppPath);

        console.log(`Attempting to launch external app via 'npm start' in directory: ${appDir}`);
        
        // We use a shell to chain 'cd' and 'npm start'. This is more robust for launching separate projects.
        // The 'detached: true' and 'stdio: 'ignore'' options allow the child process to run independently
        // of the main application, so it will continue running even if the main app is closed.
        const child = spawn('npm', ['start'], {
            cwd: appDir,
            detached: true,
            stdio: 'pipe', // We use 'pipe' to capture stderr
            shell: true,
        });

        // Log any errors from the child process
        child.stderr.on('data', (data) => {
            console.error(`[${path.basename(appDir)}] stderr: ${data}`);
        });

        child.on('error', (err) => {
            console.error(`[Launcher] Failed to start subprocess for ${appDir}. Error: ${err.message}`);
        });

        child.on('exit', (code, signal) => {
            if (code !== 0) {
                console.error(`[Launcher] Subprocess for ${appDir} exited with code ${code} and signal ${signal}`);
            }
        });

        // Unreference the child process to allow the parent to exit independently
        child.unref();

        return true;
    } catch (error) {
        console.error(`Error launching external app for path ${relativeAppPath}:`, error);
        return false;
    }
}

module.exports = { launchExternalAppByPath };