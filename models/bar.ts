export type Bar = {
  id: string
  name: string
  password: string
  token: string
}

export const mapResponseToBar = (response: any): Bar => {
  return {
    id: response["id"],
    name: response["name"],
    password: response["password"],
    token: response["token"],
  }
}
