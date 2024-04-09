import { PrismaClient } from "@prisma/client";

if (!('db' in globalThis)) (globalThis as any).db = new PrismaClient();
const db = (globalThis as any).db as PrismaClient;

export default db;