import React, { useState } from 'react'
import { useRegisterMutation } from '../../generated/graphql'
import { RouteComponentProps } from 'react-router'

export const RegisterPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [register] = useRegisterMutation()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        console.log('form submitted')

        const res = await register({
          variables: {
            username,
            email,
            password,
          },
        })
        console.log(res)
        history.push('/')
      }}
    >
      <div>
        <input
          type='text'
          value={username}
          placeholder='username'
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
        <br />
        <input
          type='email'
          value={email}
          placeholder='email'
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </div>
      <br />
      <div>
        <input
          type='password'
          value={password}
          autoComplete='on'
          placeholder='password'
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </div>
      <button type='submit'>Register</button>
    </form>
  )
}
