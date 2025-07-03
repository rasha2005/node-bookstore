const fs = require('fs').promises;
const path = require('path');

const getFilePath = (fileName) => path.join(__dirname , ".." , "data" , fileName);


async function readJSON(fileName) {
    try {
        const filePath = getFilePath(fileName)
        const data = await fs.readFile(filePath);
        return JSON.parse(data || []);
    }catch (err) {
        if (err.code === 'ENOENT') return []; 
        throw err;
}
}

async function writeJSON(fileName , data) {
        const filePath = getFilePath(fileName);
        await fs.writeFile(filePath , JSON.stringify(data , null , 2));
}

module.exports = {
    readJSON,
    writeJSON
}