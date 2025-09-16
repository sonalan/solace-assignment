import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from './api-error';
import { createErrorResponse } from './api-response';

export type ApiHandler = (request: NextRequest) => Promise<NextResponse>;

export function withErrorHandling(handler: ApiHandler): ApiHandler {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(request);
    } catch (error) {
      console.error('API Error:', error);

      if (error instanceof ApiError) {
        return createErrorResponse(error);
      }

      if (error instanceof Error) {
        return createErrorResponse(error);
      }

      // Handle non-Error objects
      return createErrorResponse(new Error('An unexpected error occurred'));
    }
  };
}