import { ApiResponse, success } from "../../../common/responses/response.js";
import { IAddStoreRequest, IStoreResponse } from "../dtos/store.dto.js";
import { addRegionStore } from "../services/store.service.js";
import { Body, Controller, Post, Route, Tags } from "tsoa";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {
  @Post("")
  public async handleAddStore(@Body() body: IAddStoreRequest): Promise<ApiResponse<IStoreResponse>> {
    console.log("특정 지역에 가게 추가 기능 요청");
    console.log("body: ", body);

    const store = await addRegionStore(body);
    return success(store);
  }
}
