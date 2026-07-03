import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
const app = express();
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0]
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode
        };
      }
    }
  })
);
// app.use(cors());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://byteshare.onrender.com" // replace with your actual frontend URL
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
var stdin_default = app;
export {
  stdin_default as default
};



git add .           
 git commit -m "app.js cors update for production"
 git push origin main