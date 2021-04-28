import { PropsWithChildren } from 'react'
import styles from './MainContent.module.css'

export default function MainContent(props: PropsWithChildren<object>) {
  return (
    <div className={styles.container}>
      <div className="container-fluid">
        <div>{props.children}</div>
      </div>
    </div>
  )
}
