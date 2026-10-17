import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient instance across the app
// (prevents extra connections when the dev server reloads)
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;