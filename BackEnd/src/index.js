const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
// const helmet=require("helmet");
// const ratelimit=require('express-rate-limit');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path');

const master = require("./config/db");
const redisClient = require("./config/redis");
const { authRouter } = require("./routes/userAuth");
const { adminRight } = require("./routes/adminTakat");
const flagRoutes = require("./routes/flagRoutes");
const leaderRoute = require("./routes/leaderRoutes");
const router = require("./routes/flagRoutes");
const eventTimerRoute = require("./routes/eventTimerRoute");



app.use(express.static(path.join(__dirname, 'public')));

// SPA Routing: Handle frontend routing by serving index.html for unknown routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.get('(.*)', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const allowedOrigins = [
  "http://localhost:5173",       // For local development
  "http://localhost:3000",       // Alternative local port
  "https://ctf.shipflow.in",     // 🌐 Your secure production domain
  "http://ctf.shipflow.in"       // Your non-secure production domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".shipflow.in")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Quick tip: "UPDATE" isn't a standard HTTP method, PUT/PATCH handles it!
    credentials: true,
  })
);
// app.use(helmet());
// const ratelimiter=ratelimit({
//   windowMs:10*60*1000,
//   max:10,
//   message:{
//     success:false,
//     message:"dont mess with the application count your requests aisa mt kr bhai :("
//   },
//   standardHeaders:true,
//   legacyHeaders:false,
//   // keyGenerator:(req)=>
//   //   req.body?.email_id||req.ip,
// ipv6Subnet: 56,

// })

app.get("/", (req, res) => {
  res.status(200).send("Server utha hua hai bhai.");
});


app.use(cookieParser());
app.use(express.json());
app.use("/api/event-time", eventTimerRoute);

// app.use("/user", ratelimiter,authRouter);
app.use("/user", authRouter);
app.use("/letadmincook", adminRight);
app.use("/api", flagRoutes);
app.use("/see", leaderRoute);
app.use("/user", router);



// const fullapplimiter=
// ratelimit({
//   windowMs:15*60*1000, //--> 15minutes
//   max:100,
//   message:{
//     message:{message:"guess you are messing up with the application hitting the same endpoint again and again, come back later ;)"}
//   }
// })
// app.use(fullapplimiter)



const InitializeConnection = async () => {
  try {
    await Promise.all([master(), redisClient.connect()]);
    console.log(`both database connected succefully`);
    app.listen(process.env.BE_PORT, () => {
      console.log(`server listening at port: ${process.env.BE_PORT}`);
    });
  } catch (err) {
    console.log(`Error occured while connecting to the database ` + err);
  }
};
InitializeConnection();
