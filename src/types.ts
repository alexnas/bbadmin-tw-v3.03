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

export type { IProvince, ICity }
