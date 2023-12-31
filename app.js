// const express = require("express");
import session from "express-session";
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
try{
    mongoose.connect(CONNECTION_STRING);
    console.log("connected to database");
}catch(error){
    console.log("could not connect");
}


const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
 );
app.use(express.json());
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));
  
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
HelloRoutes(app);
UserRoutes(app);

app.listen(process.env.PORT||4000);
