import { Constants } from "@/generic/constants"
import { ApiService} from "./api-service"
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
}
