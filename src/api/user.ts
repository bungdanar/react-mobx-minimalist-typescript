import { CriteriaModifier } from '../data-types/criteria-modifier'
import { User, UserPaginated } from '../data-types/user'
import { request } from '../utils/handle-request'

export interface UserParams {
  limit: number
  offset: number
  sort: string[]
  name?: CriteriaModifier<string>
}

export interface UserLoginPayload {
  email: string
  password: string
}

export const userApi = {
  getAll: () => request.get<User[]>('/api/user'),

  getAllPaginated: (params: UserParams) =>
    request.get<UserPaginated>('/api/user/pagination', params),

  getOneById: (id: number) => request.get<User>(`/api/user/${id}`),

  login: (payload: UserLoginPayload) =>
    request.post<User>('/api/user/login', payload),

  checkCurrentUser: () => request.get<User>('/api/user/currentUser'),

  logout: () => request.post<{}>('/api/user/logout'),
}
