import app from './app'
import 'dotenv/config'
const appPort = process.env.PORT || 3000
const processId = process.pid

app.get("/", (req, res) => {
    // for (let index = 0; index < 1e7; index++)
        res.status(200).json({ message: `Handdled by ${process.pid}` })
})

const server = app.listen(appPort, () => {
    console.log(`Server started (PID: ${processId}) on PORT: ${appPort}\n${new Date()}`)
})

process.on('SIGINT', (signal) => {
    console.log(signal)
    server.close(() => { console.log(`PID:${process.pid} terminated`); process.exit(0) })
    // setTimeout(() => { process.exit(0) }, 1000).unref()
})
process.on('SIGTERM', (signal) => {
    console.log(signal)
    server.close(() => { console.log(`PID:${process.pid} terminated`); process.exit(0) })
    // setTimeout(() => { process.exit(0) }, 1000).unref()
})

// setTimeout(() => { process.exit(1) }, Math.random() * 1e4)