const fs = require("fs");
const path = require("path");

const readFileFromData = async (fileName) => {
    return new Promise((res, rej) => {
        fs.readFile(path.resolve(__dirname, "../data/" + fileName), 'utf8', (err, data) => {
            if (err) return rej(new Error("File is not existed."))
            res(data);
        });
    });
};

const writeFileFromData = async (fileName, pathName, data) => {
    return new Promise ((res, rej) => {
        fs.writeFile(path.join(__dirname, `/${pathName}/${fileName}`), data, (err) => {
            if (err) return rej(new Error("Can not write file"));
            res();
        })
    });
};

const fileUtils = {
    readFileFromData,
    writeFileFromData
};

module.exports = fileUtils;