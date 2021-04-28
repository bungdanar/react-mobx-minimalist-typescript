import styles from './Navbar.module.css'

export default function Navbar() {
  const rootStyles = [styles.customNavbar, 'navbar navbar-dark bg-dark']
  const logoutStyles = [styles.logout, 'navbar-brand']

  return (
    <nav className={rootStyles.join(' ')}>
      <div className="navbar-brand">Navbar</div>
      <div className="d-flex justify-content-end ">
        <div className="navbar-brand">Dummy User</div>
        <div className={logoutStyles.join(' ')}>Logout</div>
      </div>
    </nav>
  )
}
