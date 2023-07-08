import $api from '@/api'
import type { AxiosResponse } from 'axios'
import type { AuthResponse, IUser } from '@/types'

import {
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTER_ENDPOINT,
  CHECK_USER_ENDPOINT,
  IS_CONNECTED_ENDPOINT
} from '@/constants/apiConstants'

interface IConnected {
  isDbConnected: boolean
  dbConnectionMsg: string
}

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(LOGIN_ENDPOINT, { email, password })
  }

  static async register(
    email: string,
    name: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(REGISTER_ENDPOINT, { email, name, password })
  }

  static async logout(): Promise<void> {
    return $api.post(LOGOUT_ENDPOINT)
  }

  static async checkIfUserExist(email: string): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`${CHECK_USER_ENDPOINT}?email=${email}`)
  }

  static async checkIfDbConnected(): Promise<AxiosResponse<IConnected>> {
    return $api.get<IConnected>(`${IS_CONNECTED_ENDPOINT}`)
  }
}
