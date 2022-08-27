import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

const app = express();

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(compression())

export default app