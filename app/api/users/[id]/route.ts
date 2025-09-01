import { NextRequest, NextResponse } from 'next/server'
import type { User } from '../route'

let users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const { id } = await params
  const user = users.find(u => u.id === parseInt(id))
  
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
  
  return NextResponse.json(user)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const { id } = await params
  const body = await request.json()
  const userIndex = users.findIndex(u => u.id === parseInt(id))
  
  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
  
  users[userIndex] = { ...users[userIndex], ...body }
  return NextResponse.json(users[userIndex])
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const { id } = await params
  const userIndex = users.findIndex(u => u.id === parseInt(id))
  
  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
  
  const deletedUser = users.splice(userIndex, 1)[0]
  return NextResponse.json(deletedUser)
}