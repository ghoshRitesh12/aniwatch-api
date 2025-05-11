import { readFile, writeFileSync } from "fs";

export function preCommit({ tag, version }) {
    readFile("package.json", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        // Parse the JSON string into an object
        const json = JSON.parse(data);

        // Convert the object back to a JSON string
        const jsonString = JSON.stringify(json, null, 4);

        // Write the updated JSON string back to the file
        writeFileSync("package.json", jsonString);
    });

    // exec("jq --indent 4 . package.json > tmp.json && mv tmp.json package.json", (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`exec error: ${error}`);
    //         return;
    //     }
    //     if (stderr) {
    //         console.error(`stderr: ${stderr}`);
    //         return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    // });
}
