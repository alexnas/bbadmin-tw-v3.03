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

export type { IProvince, ICity, ICompany }
