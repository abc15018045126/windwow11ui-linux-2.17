const path = require('path');
const { spawn } = require('child_process');
const { FS_ROOT } = require('./constants');

function launchExternalAppByPath(relativeAppPath, args = []) {
    try {
        const appDir = path.join(FS_ROOT, relativeAppPath);

        console.log(`Attempting to launch external app via 'npm start' in directory: ${appDir}`);
        
        const child = spawn('npm', ['start', ...args], {
            cwd: appDir,
            detached: true,
            stdio: 'pipe',
            shell: true,
            env: {
                ...process.env,
                // Ensure the child process can find the parent's node_modules, especially electron.
                NODE_PATH: path.resolve(FS_ROOT, 'node_modules'),
            }
        });

        const appName = path.basename(appDir);

        child.stdout.on('data', (data) => {
            console.log(`[${appName}] stdout: ${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`[${appName}] stderr: ${data}`);
        });

        child.on('error', (err) => {
            console.error(`[Launcher] Failed to start subprocess for ${appName}. Error: ${err.message}`);
        });

        child.on('exit', (code, signal) => {
            if (code !== 0) {
                console.error(`[Launcher] Subprocess for ${appName} exited with code ${code} and signal ${signal}`);
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