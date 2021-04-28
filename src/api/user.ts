import { User } from '../data-types/user'
import { request } from '../utils/handle-request'

export const userApi = {
  getAll: () => request.get<User[]>('/api/user'),
  getOneById: (id: number) => request.get<User>(`/api/user/${id}`),
  login: (payload: Object = {}) =>
    request.post<User>('/api/user/login', payload),
  checkCurrentUser: () => request.get<User>('/api/user/currentUser'),
  logout: () => request.post<{}>('/api/user/logout'),
}