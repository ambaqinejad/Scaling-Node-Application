const http = require('http');
const port = +(process.argv[2] || 3000);

http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        port, 
        processId: process.pid
    }))
}).listen(port)



// pm2 start pm2.js
// pm2 list
// pm2 stop     <app_name|namespace|id|'all'|json_conf>
// pm2 restart  <app_name|namespace|id|'all'|json_conf>
// pm2 delete   <app_name|namespace|id|'all'|json_conf>
// pm2 describe <id|app_name>
// pm2 monit