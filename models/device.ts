export type Device = {
  id: string
  barId: string
  name: string
}

export const mapResponseToDevice = (response: any): Device => {
  return {
    id: response["id"],
    barId: response["barId"],
    name: response["name"],
  }
}
