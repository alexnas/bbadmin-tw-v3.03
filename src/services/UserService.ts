import $api from '@/api'
import type { AxiosResponse } from 'axios'
import type { IUser } from '@/types'
import { USER_ENDPOINT } from '@/constants/apiConstants'

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>(USER_ENDPOINT)
  }
}
