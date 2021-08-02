import React from 'react'
import { useUsersQuery } from '../../generated/graphql'

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: 'network-only' })

  if (loading) {
    return <div>loading</div>
  }
  if (!data) {
    return <div>no data</div>
  }
  return (
    <div>
      <h1>Wowee! Hi! Hello! 👋</h1>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email}, {user.id}
          </li>
        ))}
      </ul>
    </div>
  )
}
