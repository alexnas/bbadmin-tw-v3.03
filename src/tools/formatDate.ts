import { format } from 'fecha'

export const formatDateTime = (dateString: string) => {
  return format(new Date(dateString), 'YYYY-MM-DD hh:mm')
}
