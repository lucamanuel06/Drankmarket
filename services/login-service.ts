import { ApiService} from "./api-service"

export class LoginService extends ApiService {

  constructor() {
    super("/bar/login")
  }

  async login(name: string, password: string): Promise<boolean> {
    let response = await this.doRequest("POST", {
      "name": name,
      "password": password,
    })
    return response.ok
  }
}
