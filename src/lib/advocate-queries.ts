import { sql, ilike, or, eq } from "drizzle-orm";
import db from "../db";
import { advocates } from "../db/schema";
import { DatabaseError } from './api-error';

export interface AdvocateSearchParams {
  searchTerm?: string;
  page: number;
  pageSize: number;
}

export interface AdvocateSearchResult {
  data: any[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

function buildSearchConditions(searchTerm: string) {
  return or(
    ilike(advocates.firstName, `%${searchTerm}%`),
    ilike(advocates.lastName, `%${searchTerm}%`),
    ilike(advocates.city, `%${searchTerm}%`),
    ilike(advocates.degree, `%${searchTerm}%`),
    sql`CAST(${advocates.specialties} AS TEXT) ILIKE ${`%${searchTerm}%`}`,
    isNaN(Number(searchTerm))
      ? sql`CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${'%' + searchTerm + '%'}`
      : eq(advocates.yearsOfExperience, Number(searchTerm)),
    sql`CAST(${advocates.phoneNumber} AS TEXT) ILIKE ${`%${searchTerm}%`}`
  );
}

export async function searchAdvocates(params: AdvocateSearchParams): Promise<AdvocateSearchResult> {
  try {
    const { searchTerm, page, pageSize } = params;
    const offset = (page - 1) * pageSize;

    // Build base query
    let queryBuilder = db.select().from(advocates);
    let countQuery = db.select({ count: sql<number>`count(*)` }).from(advocates);

    // Apply search filters if provided
    if (searchTerm) {
      const searchConditions = buildSearchConditions(searchTerm);
      queryBuilder = queryBuilder.where(searchConditions);
      countQuery = countQuery.where(searchConditions);
    }

    // Execute queries in parallel
    const [data, [{ count: totalCount }]] = await Promise.all([
      queryBuilder.limit(pageSize).offset(offset),
      countQuery
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      data,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  } catch (error) {
    console.error('Database query failed:', error);
    throw new DatabaseError('Failed to search advocates');
  }
}