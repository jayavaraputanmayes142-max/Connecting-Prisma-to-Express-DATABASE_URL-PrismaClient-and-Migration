// ─────────────────────────────────────────────────────────────
// Express entry point.
// Connects to PostgreSQL via Prisma before starting the server.
// ─────────────────────────────────────────────────────────────
import "dotenv/config"; // loads DATABASE_URL from .env before anything reads process.env
import express from "express";
import cors from "cors";
import threadsRouter from "./routes/threads.js";
import prisma from "./prisma/client.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/threads", threadsRouter);

const PORT = 3001;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected to PostgreSQL database");

    app.listen(PORT, () => {
      console.log(`🚀 Threadbase API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database. Check DATABASE_URL in .env");
    console.error(error);
    process.exit(1);
  }
}

startServer();

// Close the database connection cleanly when the server is stopped (Ctrl+C)
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("🔌 Prisma disconnected");
  process.exit(0);
});
