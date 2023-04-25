interface IProvince {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

interface ICity {
  id: number
  name: string
  provinceId: number
  description: string
  createdAt: string
  updatedAt: string
}

interface ICompany {
  id: number
  name: string
  fullname: string
  logo: string
  rating: number
  description: string
  createdAt: string
  updatedAt: string
}

interface IRoute {
  id: number
  name: string
  companyId: number
  startCityId: number
  endCityId: number
  viaCityId: number
  start_time: string
  end_time: string
  price: number
  distance: number
  startTerminalId: number
  endTerminalId: number
  busInfoId: number
  description: string
  createdAt: string
  updatedAt: string
}

interface IUser {
  id: number
  name: string
  email: string
  roleId: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface IRole {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export type { IProvince, ICity, ICompany, IRoute, IRole, IUser }
