import { Role } from './role'

export type User = {
  id: number
  name: string
  email: string
  address?: string
  roles?: Role[] | undefined
  exp?: number
}

export type UserPaginated = {
  rows: User[]
  count: number
}
