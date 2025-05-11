import { readFile, writeFileSync } from "fs";

export function preCommit({ tag, version }) {
    readFile("package.json", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        console.log({ tag, version });

        const json = JSON.parse(data);
        const jsonString = JSON.stringify(json, null, 4);

        writeFileSync("package.json", jsonString);
    });
}
