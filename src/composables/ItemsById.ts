interface INameById {
  id: number
  name: string
}

const useItemNameById = <T extends INameById>(id: number, items: T[]): string => {
  const idx = items.findIndex((item) => item && item.id && +item.id === +id)
  return idx === -1 ? '' : items[idx].name
}

export { useItemNameById }
