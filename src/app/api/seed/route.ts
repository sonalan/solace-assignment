import { NextRequest } from "next/server";
import { withErrorHandling } from "../../../lib/api-handler";
import { createSuccessResponse } from "../../../lib/api-response";
import { DatabaseError } from "../../../lib/api-error";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

async function handleSeedDatabase(_request: NextRequest) {
  try {
    // Check if database is already seeded
    const existingRecords = await db.select().from(advocates).limit(1);

    if (existingRecords.length > 0) {
      return createSuccessResponse(
        { message: "Database already seeded", count: 0 },
        "Database was already seeded with data"
      );
    }

    // Insert seed data
    const records = await db.insert(advocates).values(advocateData).returning();

    return createSuccessResponse(
      { advocates: records, count: records.length },
      `Successfully seeded database with ${records.length} advocates`,
      201
    );
  } catch (error) {
    console.error('Database seeding failed:', error);
    throw new DatabaseError('Failed to seed database with advocate data');
  }
}

export const POST = withErrorHandling(handleSeedDatabase);
