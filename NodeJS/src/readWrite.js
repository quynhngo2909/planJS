const fsPromise = require('fs').promises;
const path = require('path');

let characterADialogue = [];
let characterBDialogue = [];

const readWriteFile = async (folderA, fileA, folderB, fileB, folderResult, fileResult) => {
    try {
        const dataA = (await fsPromise.readFile(path.join(__dirname, folderA, fileA), 'utf8')).split("\r");
        const dataB = (await fsPromise.readFile(path.join(__dirname, folderB, fileB), 'utf8')).split("\r");
        for (let i = 0; i < dataA.length; i++) {
            characterADialogue.push(dataA[i]);
        }

        console.log(dataB.length);
        for (let i = 0; i < dataB.length; i++) {
            characterBDialogue.push(dataB[i]);
        }

        let sizeConversation = Math.max(characterADialogue.length, characterBDialogue.length);

        for (let i = 0; i < sizeConversation; i++) {
            console.log(characterADialogue[i]);
            console.log(characterBDialogue[i]);
            let inputData = "";
            if (typeof characterADialogue[i] == 'undefined') {
                inputData += `\n`;
            } else {
                inputData += `\n${characterADialogue[i]}`;
            }

            if (typeof characterBDialogue[i] == 'undefined') {
                inputData += `\n`
            } else {
                inputData += `\n${characterBDialogue[i]}`;
            }
            await fsPromise.appendFile(path.join(__dirname, folderResult, fileResult), inputData);
        }
    } catch (err) {
        console.log(err);
    }
};

readWriteFile('document', 'characterA.txt', 'document', 'characterB.txt', 'document', 'conversation.txt');
