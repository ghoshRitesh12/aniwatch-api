const { exec } = require('child_process');

export function preCommit({ tag, version }) {
    exec('jq --indent 4 . package.json > tmp.json && mv tmp.json package.json', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}
