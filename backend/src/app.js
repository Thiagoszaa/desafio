const express  =  require('express')
const routers = require('./api')
const cors = require ('cors')
const app = express()
const { sequelize } = require('./models')

app.use(cors())
app.use(express.json())
app.use('/', routers)


sequelize.sync().then(()  =>{
    console.log('COnectado com o banco de dados')
})
 
app.listen(3000, () => {

    console.log('Subiu')
})