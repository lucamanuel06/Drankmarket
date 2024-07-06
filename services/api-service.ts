import apiConfig from "../api-config.json"

export abstract class ApiService {

  protected url

  protected constructor(url: string) {
    this.url = `${apiConfig["api_base_url"]}${url}`
  }

  protected async getRequest(...params: Array<QueryParameter>): Promise<Response> {
    let url = this.url
    if (params.length > 0) {
      url += "?" + params.map(this.mapParamToString).join("&")
    }

    let response = await fetch(url)

    if (this.isNotError(response)) {
      return response
    } else {
      throw Error(`An error occurred while doing a GET request to ${url}`)
    }
  }

  protected async doRequest(method: string, body: object | null = null): Promise<Response> {
    let response = await fetch(this.url, {
      headers: {
        "Content-Type": "application/json"
      },
      method: method,
      body: JSON.stringify(body),
    })

    if (this.isNotError(response)) {
      return response
    } else {
      throw Error(`An error occurred while doing a ${method} request to ${this.url}`)
    }
  }

  private isNotError(response: Response) {
    let goodStatuses = [200, 201, 401] // Feel free to expand
    return goodStatuses.includes(response.status)
  }

  private mapParamToString(param: QueryParameter): string {
    return `${param.name}=${param.value}`
  }
}

export type QueryParameter = {
  name: string
  value: string
}
