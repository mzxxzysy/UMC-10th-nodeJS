import { ApiResponse, success } from "../../../common/responses/response.js";
import { IAddStoreRequest, IStoreResponse, MissionsListResponse, ReviewListResponse } from "../dtos/store.dto.js";
import { addRegionStore, handleStoreMissions, listStoreReviews } from "../services/store.service.js";
import { Body, Controller, Get, Path, Post, Query, Route, Tags } from "tsoa";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {
  // 특정 지역에 가게 추가하기
  @Post("")
  public async handleAddStore(@Body() body: IAddStoreRequest): Promise<ApiResponse<IStoreResponse>> {
    console.log("특정 지역에 가게 추가 기능 요청");
    console.log("body: ", body);

    const store = await addRegionStore(body);
    return success(store);
  }

  // 가게 리뷰 목록 조회
  @Get("{storeId}/reviews")
  public async handleListStoreReviews(@Path() storeId: number, @Query() cursor: number = 0): Promise<ApiResponse<ReviewListResponse>> {
    const review = await listStoreReviews(storeId, cursor);
    return success(review);
  }

  // 특정 가게의 미션 목록 조회
  @Get("{storeId}/missions")
  public async handleListStoreMissions(@Path() storeId: number, @Query() cursor: number = 0): Promise<ApiResponse<MissionsListResponse>> {
    const review = await handleStoreMissions(storeId, cursor);
    return success(review);
  }
}
