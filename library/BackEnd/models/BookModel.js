
const fs = require("fs")

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