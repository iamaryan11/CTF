const dotenv = require("dotenv");
dotenv.config();
const {createClient}=require('redis');
const redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSER,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
          tls: false, 
    connectTimeout: 10000,
    }
});
redisClient.on('error', (err) => {
  console.error(' Redis connection error:', err);
});

redisClient.on('connect', () => {
  console.log(' Redis connected successfully');
});

module.exports=redisClient;