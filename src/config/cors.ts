import cors from "cors";

const corsConfig = cors({
  origin: "*",
  methods: "GET",
  credentials: true,
  optionsSuccessStatus: 200,
});

export default corsConfig;
