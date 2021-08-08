import { ReactNode } from 'react'
import Center from '../center/Center'
import CustomLoader from '../custom-loader/CustomLoader'

interface PageSpinnerProps {
  loading: boolean
  errMessage: string
  children?: ReactNode
}

export default function PageSpinner({
  loading,
  errMessage,
  children,
}: PageSpinnerProps): JSX.Element {
  if (loading) {
    return (
      <Center>
        <CustomLoader size={50} />
      </Center>
    )
  } else {
    if (errMessage.trim() !== '') {
      return (
        <Center>
          <span style={{ color: 'red', fontWeight: 600 }}>{errMessage}</span>
        </Center>
      )
    } else {
      return <>{children}</>
    }
  }
}
