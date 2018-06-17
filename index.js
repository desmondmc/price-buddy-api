const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello Guy!'))
app.listen(3000, () => console.log('Welcome to Price Buddy!'))