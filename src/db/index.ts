import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    // Return a more complete mock that matches drizzle's interface
    return {
      select: () => ({
        from: () => ({
          where: () => ({
            limit: () => ({
              offset: () => Promise.resolve([])
            })
          }),
          limit: () => ({
            offset: () => Promise.resolve([])
          })
        })
      }),
    } as any;
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
