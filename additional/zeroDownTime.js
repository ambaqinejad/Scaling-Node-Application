const cluster = require("cluster");
const http = require("http");
const numOfCpus = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`This is the master process with pid: ${process.pid}`);
  for (let i = 0; i < numOfCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`${worker.process.pid} has died`);
    cluster.fork();
    console.log('new worker has attached.');
    console.log('Remaining');
    for (const worker of Object.values(cluster.workers)) {
        console.log(worker.process.pid);
    }
  });
} else {
  console.log(`This is the worker process with pid: ${process.pid}`);
  http
    .createServer((req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          port: 3000,
          processId: process.pid,
        })
      );

      if (req.url === "/") {
        console.log(`Serving from process ${process.pid}`);
      } else if (req.url === '/kill') {
        process.exit();
      }
    })
    .listen(3000);
}
