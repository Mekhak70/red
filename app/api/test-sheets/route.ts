// app/api/test-url/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const SHEET_ID = '1sRSw9AGKl9bYS63Y5hxN-okEWBVxXJ-zitM3CDn--e8';
  const sheetName = encodeURIComponent('Հացաբուլկեղեն և հրուշակեղեն');
  const url = `https://opensheet.elk.sh/${SHEET_ID}/${sheetName}`;
  
  try {
    console.log(`🔍 Testing URL: ${url}`);
    
    const response = await fetch(url);
    console.log(`📊 Status: ${response.status}`);
    
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        status: response.status,
        statusText: response.statusText,
        url: url,
      }, { status: response.status });
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      status: response.status,
      url: url,
      totalRows: data.length,
      firstRow: data[0],
      secondRow: data[1],
      thirdRow: data[2],
      sample: data.slice(0, 5),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
      url: url,
    }, { status: 500 });
  }
}