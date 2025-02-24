
const fs = require("fs")

/**
 * Read a JSON File  content.
 * @param {string} file - File name .
 * @returns {Object} file data
 */

exports.readFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) {
                console.error("Error reading file ", err);
                reject({ message: "Internal srver error" });
            }
            else { resolve(JSON.parse(data)); }
        });
    });
}


/**
 * Write in  a JSON File .
 * @param {string} file - File name .
 * @param {string} data - File content .
 * @returns {Object} message
 */

exports.writeFile = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error("Error writing in file ", err);
                reject({ message: "Internal error" });
            }
            else resolve({ message: "Sucessful" });
        });
    });

}