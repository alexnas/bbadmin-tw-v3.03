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
  start_time: string
  end_time: string
  price: number
  distance: number
  description: string
  createdAt: string
  updatedAt: string
}

export type { IProvince, ICity, ICompany }
