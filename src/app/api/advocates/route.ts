import db from "../../../db";
import { advocates } from "../../../db/schema";
// import { advocateData } from "../../../db/seed/advocates";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search_term');
  const pageSize = parseInt(searchParams.get('page_size') || '10');
  const page = parseInt(searchParams.get('page') || '1');

  const offset = (page -1) * pageSize
  
  // Uncomment this line to use a database
  const data = await db.select().from(advocates);

  // const data = advocateData;

  return Response.json({ data });
}
