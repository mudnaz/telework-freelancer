import morgan from "morgan";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const applyMiddleware = (app) => {
  app.use(morgan("dev"));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
};

export default applyMiddleware;
