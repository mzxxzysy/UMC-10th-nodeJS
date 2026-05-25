import { ApiResponse, success } from "../../../common/responses/response.js";
import { IAddStoreRequest, IStoreResponse, MissionsListResponse, ReviewListResponse } from "../dtos/store.dto.js";
import { addRegionStore, handleStoreMissions, listStoreReviews } from "../services/store.service.js";
import { Body, Controller, Get, Path, Post, Query, Route, Tags, Response } from "tsoa";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {
  /**
   * 특정 지역에 가게 추가하기
   * @summary 특정 지역에 가게 추가하는 엔드포인트입니다.
   */
  @Post("")
  @Response<ApiResponse<IStoreResponse>>(200, "가게 등록 성공")
  @Response<ApiResponse<null>>(404, "이미 등록된 가게 에러")
  public async handleAddStore(@Body() body: IAddStoreRequest): Promise<ApiResponse<IStoreResponse>> {
    console.log("특정 지역에 가게 추가 기능 요청");
    console.log("body: ", body);

    const store = await addRegionStore(body);
    return success(store);
  }

  /**
   * 가게 리뷰 목록 조회
   * @summary 가게 리뷰 목록 조회하는 엔드포인트입니다.
   */
  @Get("{storeId}/reviews")
  @Response<ApiResponse<ReviewListResponse>>(200, "가게 리뷰 목록 조회 성공")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게 에러")
  public async handleListStoreReviews(@Path() storeId: number, @Query() cursor: number = 0): Promise<ApiResponse<ReviewListResponse>> {
    const review = await listStoreReviews(storeId, cursor);
    return success(review);
  }

  /**
   * 특정 가게의 미션 목록 조회
   * @summary 가게 미션 목록 조회하는 엔드포인트입니다.
   */
  @Get("{storeId}/missions")
  @Response<ApiResponse<MissionsListResponse>>(200, "가게 미션 목록 조회 성공")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게 에러")
  public async handleListStoreMissions(@Path() storeId: number, @Query() cursor: number = 0): Promise<ApiResponse<MissionsListResponse>> {
    const review = await handleStoreMissions(storeId, cursor);
    return success(review);
  }
}
