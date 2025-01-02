import { ApiService } from "./api-service";

export class CrashService extends ApiService {

  constructor() {
    super("/drinks/crash")
  }

  crashMarket(ids: string[], dropPercentage: number) {
    this.doRequest("PUT", {
      "ids": ids,
      "drop_percentage": dropPercentage,
    })
  }
}
