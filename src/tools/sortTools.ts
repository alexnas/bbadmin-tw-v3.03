import type { ICompany, IRoute, ICity, IUser, IRole } from '@/types'
import { useItemNameById } from '@/composables/ItemsById'

export function sortedByCompanyId(
  sortProperty: keyof IRoute,
  sortOrder: 'asc' | 'desc',
  companies: ICompany[]
) {
  const compareFn = (a: IRoute, b: IRoute) => {
    const val1 = useItemNameById(a.companyId, companies)
    const val2 = useItemNameById(b.companyId, companies)
    const order = sortOrder !== 'desc' ? 1 : -1
    return val1.localeCompare(val2) * order
  }
  return compareFn
}

export function sortedByStartCityId(
  sortProperty: keyof IRoute,
  sortOrder: 'asc' | 'desc',
  cities: ICity[]
) {
  const compareFn = (a: IRoute, b: IRoute) => {
    const val1 = useItemNameById(a.startCityId, cities)
    const val2 = useItemNameById(b.startCityId, cities)
    const order = sortOrder !== 'desc' ? 1 : -1
    return val1.localeCompare(val2) * order
  }
  return compareFn
}

export function sortedByEndCityId(
  sortProperty: keyof IRoute,
  sortOrder: 'asc' | 'desc',
  cities: ICity[]
) {
  const compareFn = (a: IRoute, b: IRoute) => {
    const val1 = useItemNameById(a.endCityId, cities)
    const val2 = useItemNameById(b.endCityId, cities)
    const order = sortOrder !== 'desc' ? 1 : -1
    return val1.localeCompare(val2) * order
  }
  return compareFn
}

export function sortedByViaCityId(
  sortProperty: keyof IRoute,
  sortOrder: 'asc' | 'desc',
  cities: ICity[]
) {
  const compareFn = (a: IRoute, b: IRoute) => {
    const val1 = useItemNameById(a.viaCityId, cities)
    const val2 = useItemNameById(b.viaCityId, cities)
    const order = sortOrder !== 'desc' ? 1 : -1
    return val1.localeCompare(val2) * order
  }
  return compareFn
}

export function sortedByPrice(
  sortProperty: keyof IRoute,
  sortOrder: 'asc' | 'desc'
  // cities: ICity[]
) {
  const compareFn = (a: IRoute, b: IRoute) => {
    const val1 = +a[sortProperty]
    const val2 = +b[sortProperty]
    const order = sortOrder !== 'desc' ? 1 : -1
    return (val1 - val2) * order
  }
  return compareFn
}

export function sortedByTime(sortProperty: keyof IRoute, sortOrder: 'asc' | 'desc') {
  const compareFn = (a: IRoute, b: IRoute) => {
    const val1 = new Date('1970-01-01T' + a[sortProperty]).getTime()
    const val2 = new Date('1970-01-01T' + b[sortProperty]).getTime()
    const order = sortOrder !== 'desc' ? 1 : -1
    return (val1 - val2) * order
  }
  return compareFn
}

export function sortedByRole(sortProperty: keyof IUser, sortOrder: 'asc' | 'desc', roles: IRole[]) {
  const compareFn = (a: IUser, b: IUser) => {
    const val1 = useItemNameById(a.roleId, roles)
    const val2 = useItemNameById(b.roleId, roles)
    const order = sortOrder !== 'desc' ? 1 : -1
    return val1.localeCompare(val2) * order
  }
  return compareFn
}
