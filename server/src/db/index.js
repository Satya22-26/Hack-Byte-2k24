import mongoose from 'mongoose';

const connectDB = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/Dehaze`,{
            writeConcern: {
              w: 'majority',
              j: true,
              wtimeout: 1000,
            },
        });
        
        console.log("MongoDB is Connected!!");
    }catch(error){
        console.log("MONGODB connection FAILED",error);
        process.exit(1);
    }
}

export default connectDB;
