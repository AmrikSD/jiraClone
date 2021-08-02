import React from 'react'
import { useGetUserIdQuery } from '../../generated/graphql'
interface UserPageProps {}

export const UserPage: React.FC<UserPageProps> = () => {
  const { data, loading, error } = useGetUserIdQuery()
  if (error) {
    console.log(error)
    return <div>error</div>
  }

  if (loading) {
    return <div>loading...</div>
  }
  if (!data) {
    return <div>no data</div>
  }
  return <div>{data.getId}</div>
}
