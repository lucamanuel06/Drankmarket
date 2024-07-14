import { ApiService} from "./api-service"

import apiConfig from "@/api-config.json"
import { Constants } from "@/generic/constants"
import { LoginType, User, mapResponseToUser } from "@/models/login"

export class LoginService extends ApiService {

  public user: User | null = null

  constructor() {
    super("/bar/login")
  }

  async login(name: string, password: string): Promise<LoginType> {
    let response = await this.doRequest("POST", {
      "name": name,
      "password": password,
    })

    if (!response.ok) return LoginType.Rejected

    let body = await response.json()

    this.user = mapResponseToUser(body)

    localStorage.setItem(Constants.BarId, this.user.barId)
    
    return LoginType.LoggedIn
  }

  logout() {
    localStorage.removeItem(Constants.BarId)
    this.user = null
  }

  getBarId(): string | null {
    if (this.user !== null) {
      return this.user.barId
    }

    return localStorage.getItem(Constants.BarId)
  }

  async isAdmin(): Promise<boolean> {
    if (this.user !== null) return this.user.isAdmin
    
    let storedBarId = localStorage.getItem(Constants.BarId)

    if (storedBarId === null) return false
    
    let response = await fetch(`${apiConfig["api_base_url"]}/bar?id=${storedBarId}`)
    let responseBody = await response.json()

    return responseBody["super_admin"] === 1
  }
}
