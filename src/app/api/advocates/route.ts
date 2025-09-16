import { NextRequest } from "next/server";
import { withErrorHandling } from "../../../lib/api-handler";
import { createSuccessResponse } from "../../../lib/api-response";
import { validatePositiveInteger, validatePageSize, validateSearchTerm } from "../../../lib/validation";
import { searchAdvocates } from "../../../lib/advocate-queries";

async function handleGetAdvocates(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Validate and parse parameters
  const pageSize = validatePageSize(
    validatePositiveInteger(searchParams.get('page_size'), 'page_size', 10)
  );
  const page = validatePositiveInteger(searchParams.get('page'), 'page', 1);
  const searchTerm = validateSearchTerm(searchParams.get('search_term'));

  // Execute search
  const result = await searchAdvocates({
    searchTerm,
    page,
    pageSize
  });

  return createSuccessResponse(result);
}

export const GET = withErrorHandling(handleGetAdvocates);
