import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { StoreContext } from '../../contexts/store-context'
import {
  errorSwal,
  handleCloseSwal,
  loadingSwal,
} from '../../utils/custom-swal'
import { ResponseError } from '../../utils/handle-response-err'
import styles from './Navbar.module.css'

const Navbar = observer(() => {
  const { currentUser, serverLogout } = useContext(StoreContext).userStore

  const rootStyles = [styles.customNavbar, 'navbar navbar-dark bg-dark']
  const logoutStyles = [styles.logout, 'navbar-brand']

  const handleLogout = async () => {
    loadingSwal('Logging out...')
    try {
      await serverLogout()
      handleCloseSwal()
    } catch (error) {
      handleCloseSwal()
      await errorSwal((error as ResponseError).serialize().message)
    }
  }

  return (
    <nav className={rootStyles.join(' ')}>
      <div className='navbar-brand'>Navbar</div>
      <div className='d-flex justify-content-end '>
        <div className='navbar-brand'>{currentUser?.name}</div>
        <SessionCountdown />
        <div className={logoutStyles.join(' ')} onClick={handleLogout}>
          Logout
        </div>
      </div>
    </nav>
  )
})

const SessionCountdown = observer(() => {
  const { currentUser } = useContext(StoreContext).userStore
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (currentUser) {
      const findTimeLeft = () => {
        const now = Math.floor(Date.now() / 1000)
        const differ = currentUser.exp! - now

        setTimeLeft(differ)
      }

      findTimeLeft()

      const timerId = setInterval(findTimeLeft, 1000)

      return () => {
        clearInterval(timerId)
      }
    }
  }, [currentUser])

  return (
    <div className='navbar-brand'>
      {timeLeft < 0
        ? 'Sess expired'
        : `${moment.duration(timeLeft, 'seconds').hours()}:${moment
            .duration(timeLeft, 'seconds')
            .minutes()}:${moment.duration(timeLeft, 'seconds').seconds()}`}
    </div>
  )
})

export default Navbar
