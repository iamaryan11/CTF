const mongoose=require('mongoose');
async function master(){
    await mongoose.connect(process.env.DB_CONNECT_STRING);


}
module.exports=master;
