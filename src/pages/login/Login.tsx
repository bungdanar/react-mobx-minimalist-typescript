import React, { useContext, useState } from 'react'
import CustomCard from '../../components/custom-card/CustomCard'
import TextInput from '../../components/text-input/TextInput'
import { StoreContext } from '../../contexts/store-context'
import {
  errorSwal,
  handleCloseSwal,
  loadingSwal,
} from '../../utils/custom-swal'
import { generateErrMessage } from '../../utils/handle-error'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(StoreContext).userStore

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    loadingSwal('Logging in...')

    try {
      await login({ email, password })
      handleCloseSwal()
    } catch (error) {
      handleCloseSwal()

      const errMessage = generateErrMessage(error)
      await errorSwal(errMessage)
    }
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-sm-4'>
        <CustomCard>
          <form onSubmit={handleSubmitForm}>
            <TextInput
              label='Email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <button type='submit' className='btn btn-primary btn-block'>
                Login
              </button>
            </div>
          </form>
        </CustomCard>
      </div>
    </div>
  )
}
