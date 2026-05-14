import { neonConfig } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "./generated/client/client"
import ws from "ws"

// Required for Node.js environments
neonConfig.webSocketConstructor = ws

declare global {
  var cachedPrisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL
  
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set")
  }
  
  const adapter = new PrismaNeon({ connectionString })
  return new PrismaClient({ adapter })
}

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = createPrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma