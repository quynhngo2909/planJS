const fs = require('fs');
const path = require('path');

const readFile = async (filePath) => {
    return new Promise((res, rej) => {
        fs.readFile(path.join(__dirname, filePath), "utf8", (err, data) => {
            if (err) return rej(new Error("Error: File is not existed"));
            res(data);
        });
    });
};

const getDialogue = async (filePath) => {
    const data = (await readFile(filePath)).split("\r");
    const dialogue = [];
    for (let i = 0; i < data.length; i++) {
        dialogue.push(data[i]);
    };

    return new Promise((res, rej) => {
        if (typeof dialogue.length == "undefined") return rej(new Error("Error: Can not get dialogue"));
        res(dialogue);
    });
}


const createWriteData = async (filePath1, filePath2) => {
    const dialogue1 = await getDialogue(filePath1);
    const dialogue2 = await getDialogue(filePath2);
    let sizeConversation = Math.max(dialogue1.length, dialogue2.length);
    let inputData;
    for (let i = 0; i < sizeConversation; i++) {
        if (typeof dialogue1[i] == 'undefined') {
            inputData += `\n`;
        } else {
            inputData += `\n${dialogue1[i]}`;
        }

        if (typeof dialogue2[i] == 'undefined') {
            inputData += `\n`
        } else {
            inputData += `\n${dialogue2[i]}`;
        }
    }

    return new Promise((res, rej) => {
        if (typeof inputData == "undefined") return rej(new Error("Error: Can not create writing data"));
        res(inputData);
    });
}

const writeFile = async (filePath1, filePath2, filePath3) => {
    const inputData = await createWriteData(filePath1, filePath2);
    return new Promise((res, rej) => {
        fs.writeFile(path.join(__dirname, filePath3), inputData, (err) => {
            if (err) return rej(new Error("Error: Can not write file"));
            res("Done");
        });
    });
};



writeFile("document/characterA.txt", "document/characterB.txt", "document/conversation.txt");
