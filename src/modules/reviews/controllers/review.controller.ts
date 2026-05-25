import { IAddReviewRequest, IReviewResponse } from "../dtos/review.dto.js";
import { addStoreReview, handleMyReviews } from "../services/review.service.js";
import { Body, Controller, Get, Path, Post, Query, Route, Tags, Response } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { ReviewListResponse } from "../../stores/dtos/store.dto.js";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  /**
   * 리뷰 작성하기
   * @summary 리뷰 작성하는 엔드포인트입니다.
   */
  @Post("")
  @Response<ApiResponse<IReviewResponse>>(200, "리뷰 등록 성공")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게 에러")
  public async handleAddReview(@Body() body: IAddReviewRequest): Promise<ApiResponse<IReviewResponse>> {
    console.log("리뷰 작성을 요청했습니다.");
    console.log("body: ", body);
    const review = await addStoreReview(body);
    return success(review);
  }

  /**
   * 내가 작성한 리뷰 조회하기
   * @summary 내가 작성한 리뷰를 조회하는 엔드포인트입니다.
   */
  @Get("{memberId}")
  @Response<ApiResponse<ReviewListResponse>>(200, "리뷰 등록 성공")
  public async handleListMyReviews(@Path() memberId: number, @Query() cursor: number = 0): Promise<ApiResponse<ReviewListResponse>> {
    const myReview = await handleMyReviews(memberId, cursor);
    return success(myReview);
  }
}
