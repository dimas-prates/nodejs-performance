import os from 'os'
import cluster from 'cluster'

const runPrimaryProcess = () => {
    const processCount = Math.round(os.cpus().length * 0.8)

    console.log(`Primary precess (PID:${process.pid}) is running`)
    console.log(`CPU(s):${processCount}. Forking Server...\n`)

    for (let index = 0; index < processCount; index++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`Worker (PID:${worker.process.pid}) got ${signal}... starting another one`)
            cluster.fork()
        }
    })
}
const runWorkerProcess = async () => {
    await import('./server')
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()