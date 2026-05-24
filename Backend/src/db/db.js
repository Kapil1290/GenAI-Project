const mongoose = require('mongoose')


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGOOSE_SECRET);

        console.log("Mongoose connected successfully...")
    }catch(err){
        console.log("Something Wrong with database connections")
        console.log(err)
    }
}

module.exports = connectDB;