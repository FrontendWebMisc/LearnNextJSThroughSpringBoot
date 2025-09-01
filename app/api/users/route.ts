import { NextRequest, NextResponse } from 'next/server'

export interface User {
  id: number
  name: string
  email: string
  age: number
}

let users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
]

let nextId = 4

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 500))
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const body = await request.json()
  const newUser: User = {
    id: nextId++,
    name: body.name,
    email: body.email,
    age: body.age
  }
  
  users.push(newUser)
  return NextResponse.json(newUser, { status: 201 })
}