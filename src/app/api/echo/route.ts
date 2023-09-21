import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const instrunment = searchParams.get('instrunment')

  return NextResponse.json({ name, instrunment })
}