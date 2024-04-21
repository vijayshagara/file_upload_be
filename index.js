const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const expressWinston = require('express-winston')
const loggerWinston = require('./winston/loger')
const app = express()
const {dbConnect} = require('./db_connection/db')
const userController = require("./controller/user.controller");
const employeeController = require("./controller/employee.controller");
const port = parseInt(process.env.PORT || "3000");
dotenv.config();
app.use(helmet());
const cors = require("cors")

app.use(cors())
//to get json(object) response
app.use(express.json());

// winston logger
app.use(expressWinston.logger({
    winstonInstance: loggerWinston,
}));

//router connection
app.use("/api/user", userController);
app.use("/api/employee", employeeController);
// app.use("/api/forgot-password",forgotPassword);

//ERROR HANDLING
app.use((err, req, res, next) => {
  loggerWinston.error("error===>>",err)
    //winstonLogger.info("logger",err)
    if (err.message == "jwt expired") {
      return res.status(403).send({
        message: "Bad jwt Token",
      });
    }
    return res.status(500).send({
      message: "internal server error",
    });
});

//DB CONNECTION
dbConnect()

if (!process.env.PORT) {
    console.error("PORT environment variable is not set.");
    process.exit(1);
}

// port listening
app.listen(port, (e,next) => {
  if(e){
    next(e)
  }else{
    console.log(`Listening on port ${port}`);
  }
});
  