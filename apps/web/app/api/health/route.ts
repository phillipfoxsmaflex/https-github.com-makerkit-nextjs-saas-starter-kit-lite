
import { NextResponse } from 'next/server';
import { runHealthCheck } from '../../../lib/health-check';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const health = await runHealthCheck();
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: health
    });
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
