const mongoose = require('mongoose')


const connectToDB= async ()=>{
    try {
        await mongoose.connect('mongodb+srv://tejashsinghrajput:9801293794@mongo-basics.qndhm.mongodb.net/')
        console.log("mongodb connected");
        
    } catch (error) {
        console.error("mongodb connection failed",error);
        process.exit(1);
        
    }
}

module.exports=connectToDB;