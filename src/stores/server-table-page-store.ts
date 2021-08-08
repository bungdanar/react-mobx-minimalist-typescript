import { User } from '../data-types/user'
import { CommonServerSideTableStore } from './common-server-side-table-store'

export class ServerTablePageStore extends CommonServerSideTableStore<User> {}

export default new ServerTablePageStore()
