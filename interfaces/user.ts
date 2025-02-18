export interface User {
  avatar: string | null
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  orderStatuses?: boolean
  passwordChanges?: boolean
  specialOffers?: boolean
  newsletter?: boolean
}
