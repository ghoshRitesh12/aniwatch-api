import { exec } from "child_process";
import { writeFileSync } from "fs";

export function preCommit({ tag, version }) {
    writeFileSync("tmp.json", "{}")

    exec("jq --indent 4 . package.json > tmp.json && mv tmp.json package.json", (error, stdout, stderr) => {
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
