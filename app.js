const http = require('http');
const port = +(process.argv[2] || 3000);

http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        port, 
        processId: process.pid
    }))
}).listen(port)

