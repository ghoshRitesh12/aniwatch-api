import cors from "cors";
import { config } from "dotenv";

config();

const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
  ? process.env.CORS_ALLOWED_ORIGINS.split(",")
  : ["http://localhost:4000", "*"];

const corsConfig = cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET"],
  maxAge: 600,
  credentials: true,
  optionsSuccessStatus: 200,
});

export default corsConfig;
