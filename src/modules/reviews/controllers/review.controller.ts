import { IAddReviewRequest, IReviewResponse } from "../dtos/review.dto.js";
import { addStoreReview, handleMyReviews } from "../services/review.service.js";
import { Body, Controller, Get, Path, Post, Query, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { ReviewListResponse } from "../../stores/dtos/store.dto.js";

// 리뷰 작성하기
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  @Post("")
  public async handleAddReview(@Body() body: IAddReviewRequest): Promise<ApiResponse<IReviewResponse>> {
    console.log("리뷰 작성을 요청했습니다.");
    console.log("body: ", body);
    const review = await addStoreReview(body);
    return success(review);
  }

  // 내가 작성한 리뷰 목록 조회하기
  @Get("{memberId}")
  public async handleListMyReviews(@Path() memberId: number, @Query() cursor: number = 0): Promise<ApiResponse<ReviewListResponse>> {
    const myReview = await handleMyReviews(memberId, cursor);
    return success(myReview);
  }
}
