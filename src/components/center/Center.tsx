import { ReactNode } from 'react'

interface CenterProps {
  children?: ReactNode
}

export default function Center(props: CenterProps) {
  return <div style={{ textAlign: 'center' }}>{props.children}</div>
}
