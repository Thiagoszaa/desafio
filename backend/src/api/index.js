const express = require('express')
const router = express.Router()

const apartamentoRouter = require('./apartamento') 

router.get('/', (req, res) => {
  res.send('App online')
})

router.use('/api/apartamento', apartamentoRouter)

module.exports = router
