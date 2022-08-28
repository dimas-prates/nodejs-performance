import app from './app'
import 'dotenv/config'

const appPort = process.env.PORT || 3000
const processId = process.pid

app.get("/", (req, res) => {
    for (let index = 0; index < 1e7; index++);
    res.status(200).json({ message: `Handdled by ${processId}` })
});

const server = app.listen(appPort, () => {
    console.log(`Server started (PID: ${processId}) on PORT: ${appPort}\n${new Date()}`)
});

process.on('SIGINT', (signal) => {
    console.log(signal)
    server.close(() => { console.log(`PID:${processId} terminated`); process.exit(0) })
    setTimeout(() => { process.exit(0) }, 1000).unref()
});
process.on('SIGTERM', (signal) => {
    console.log(signal)
    server.close(() => { console.log(`PID:${processId} terminated`); process.exit(0) })
    setTimeout(() => { process.exit(0) }, 1000).unref()
});

process.on("uncaughtException", (error, origin) => {
    server.close(() => { console.log(`${origin}: ${error}\nPID:${processId} terminated`); process.exit(1) })
});
process.on("unhandledRejection", (reason) => {
    server.close(() => { console.log(`unhandledRejection: ${reason}\nPID:${processId} terminated`); process.exit(1) })
});

//forcing abruptly termination
// setTimeout(() => { throw new Error('FORCED ERROR\n') }, Math.random() * 1e4)