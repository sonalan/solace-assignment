import { NextRequest } from "next/server";
import { sql, ilike, or, eq } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search_term');
  const pageSize = parseInt(searchParams.get('page_size') || '10');
  const page = parseInt(searchParams.get('page') || '1');

  const offset = (page -1) * pageSize

  let queryBuilder = db.select().from(advocates);
  
  if (searchTerm) {
    queryBuilder = queryBuilder.where(
      or(
        ilike(advocates.firstName, `%${searchTerm}%`),
        ilike(advocates.lastName, `%${searchTerm}%`),
        ilike(advocates.city, `%${searchTerm}%`),
        ilike(advocates.degree, `%${searchTerm}%`),
        sql`CAST(${advocates.specialties} AS TEXT) ILIKE ${`%${searchTerm}%`}`,
        isNaN(Number(searchTerm)) 
          ? sql`CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${'%' + searchTerm + '%'}`
          : eq(advocates.yearsOfExperience, Number(searchTerm)),
        sql`CAST(${advocates.phoneNumber} AS TEXT) ILIKE ${`%${searchTerm}%`}`
      )
    );
  }
  
  // Add pagination and execute
  const data = await queryBuilder.limit(pageSize).offset(offset);


  // Get total count for pagination metadata
  let countQuery = db.select({ count: sql<number>`count(*)` }).from(advocates);
  if (searchTerm) {
    countQuery = countQuery.where(
      or(
        ilike(advocates.firstName, `%${searchTerm}%`),
        ilike(advocates.lastName, `%${searchTerm}%`),
        ilike(advocates.city, `%${searchTerm}%`),
        ilike(advocates.degree, `%${searchTerm}%`),
        sql`CAST(${advocates.specialties} AS TEXT) ILIKE ${`%${searchTerm}%`}`,
        isNaN(Number(searchTerm)) 
          ? sql`CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${'%' + searchTerm + '%'}`
          : eq(advocates.yearsOfExperience, Number(searchTerm)),
        sql`CAST(${advocates.phoneNumber} AS TEXT) ILIKE ${`%${searchTerm}%`}`
      )
    );
  }
  
  const [{ count: totalCount }] = await countQuery;
  const totalPages = Math.ceil(totalCount / pageSize);

  return Response.json({ 
    data,
    pagination: {
      page,
      pageSize,
      totalCount,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  });
}
