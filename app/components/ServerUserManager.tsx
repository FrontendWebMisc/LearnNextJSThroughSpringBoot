import { Suspense } from 'react'

interface User {
  id: number
  name: string
  email: string
  age: number
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store'
  })
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

async function UserList() {
  const users = await fetchUsers()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Server-Side User List</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-white rounded-lg shadow border">
            <h4 className="font-medium text-gray-900">{user.name}</h4>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">Age: {user.age}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function UserListSkeleton() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Server-Side User List</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 bg-white rounded-lg shadow border animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ServerUserManager() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Server-Side Component</h2>
      <p className="text-gray-700 mb-4">
        This component fetches data on the server using Next.js Server Components.
        Data is fetched during SSR and rendered on the server.
      </p>
      <Suspense fallback={<UserListSkeleton />}>
        <UserList />
      </Suspense>
    </div>
  )
}