import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Register your routes here as you build them

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
