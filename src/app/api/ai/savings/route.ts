import { NextRequest, NextResponse } from 'next/server';
import { getSavingsSuggestions, SavingsSuggestionsInput } from '@/ai/flows/ai-savings-suggestions';

// Ensure flows are registered by importing them
import '@/ai/flows/ai-savings-suggestions';

export async function POST(request: NextRequest) {
  try {
    const body: SavingsSuggestionsInput = await request.json();
    
    // Validate required fields
    if (!body.spendingData || !body.knownTips) {
      return NextResponse.json(
        { error: 'Invalid request. Missing required fields.' },
        { status: 400 }
      );
    }

    const result = await getSavingsSuggestions(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in savings API route:', error);
    return NextResponse.json(
      { error: 'Failed to generate savings suggestions. Please try again later.' },
      { status: 500 }
    );
  }
}

