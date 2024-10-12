const express = require('express')
const router = require('./routes/index')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())


app.listen(3001, () => {
    console.log('listening at port 3001');
})

app.use('/', router)