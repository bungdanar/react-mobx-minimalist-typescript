import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
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
        <div className={logoutStyles.join(' ')} onClick={handleLogout}>
          Logout
        </div>
      </div>
    </nav>
  )
})

export default Navbar
