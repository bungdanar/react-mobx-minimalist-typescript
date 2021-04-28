import React, { useState } from 'react'
import CustomCard from '../../components/custom-card/CustomCard'
import TextInput from '../../components/text-input/TextInput'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="row justify-content-center">
      <div className="col-sm-4">
        <CustomCard>
          <form onSubmit={handleSubmitForm}>
            <TextInput
              label="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>
          </form>
        </CustomCard>
      </div>
    </div>
  )
}
