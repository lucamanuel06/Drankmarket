export enum LoginType {
  Loading,
  Rejected,
  LoggedOut,
  LoggedIn,
}

export type User = {
  barId: string
  barName: string
  isAdmin: boolean
}

export const mapResponseToUser = (response: any): User => {
  return {
    barId: response["id"],
    barName: response["name"],
    isAdmin: response["super_admin"] === 1,
  }
}
