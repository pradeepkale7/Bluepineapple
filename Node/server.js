
const http = require('http');
const helper = require('./helper');

const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Welcome to Node.js!\n');


}).listen(3000);

console.log(helper.getMessage());