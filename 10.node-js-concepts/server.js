const express = require('express');
require('dotenv').config();
const {configureCors} = require('./config/cors-config');
const { requestLogger, addTimeStamp } = require('./middleware/customMiddleware');
const {globalErrorhandler} = require('./middleware/errorHandler')
const {urlVersioning}=require('./middleware/apiVersioning')
const {createBasicRateLimiter}=require('./middleware/rateLimitting')

PORT=process.env.PORT || 3000

const app=express()

app.use(requestLogger)
app.use(addTimeStamp)

//express json middleware
app.use(configureCors())
app.use(createBasicRateLimiter(100,15*60*1000)) //100 req per 15 min
app.use(express.json());

app.use('/api/v1',urlVersioning('v1'))

app.use(globalErrorhandler)


app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`);
})
