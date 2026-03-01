import { NextRequest, NextResponse } from 'next/server';
import { getFinancialAdvice, FinancialAdviceInput } from '@/ai/flows/ai-advisor-flow';

// Ensure flows are registered by importing them
import '@/ai/flows/ai-advisor-flow';

export async function POST(request: NextRequest) {
  try {
    const body: FinancialAdviceInput = await request.json();
    
    // Validate required fields
    if (!body.question || typeof body.monthlyIncome !== 'number' || typeof body.monthlyExpenses !== 'number') {
      return NextResponse.json(
        { error: 'Invalid request. Missing required fields.' },
        { status: 400 }
      );
    }

    const result = await getFinancialAdvice(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in advisor API route:', error);
    return NextResponse.json(
      { error: 'Failed to get financial advice. Please try again later.' },
      { status: 500 }
    );
  }
}

