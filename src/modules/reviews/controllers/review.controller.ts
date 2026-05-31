import { IAddReviewRequest, IReviewResponse } from "../dtos/review.dto.js";
import { addStoreReview, handleMyReviews } from "../services/review.service.js";
import { Body, Controller, Get, Path, Post, Query, Route, Tags, Request, Response, Middlewares } from "tsoa";
import { Request as ExpressRequest } from "express";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { ReviewListResponse } from "../../stores/dtos/store.dto.js";
import { isLogin } from "../../../common/middlewares/auth.middleware.js";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  /**
   * 리뷰 작성하기
   * @summary 리뷰 작성하는 엔드포인트입니다.
   */
  @Post("")
  @Middlewares(isLogin)
  @Response<ApiResponse<IReviewResponse>>(200, "리뷰 등록 성공")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게 에러")
  public async handleAddReview(@Request() req: ExpressRequest, @Body() body: IAddReviewRequest): Promise<ApiResponse<IReviewResponse>> {
    console.log("리뷰 작성을 요청했습니다.");
    console.log("body: ", body);
    const user = req.user as any;
    const review = await addStoreReview(body, Number(user.id));
    return success(review);
  }

  /**
   * 내가 작성한 리뷰 조회하기
   * @summary 내가 작성한 리뷰를 조회하는 엔드포인트입니다.
   */
  @Get("me")
  @Middlewares(isLogin)
  @Response<ApiResponse<ReviewListResponse>>(200, "리뷰 조회 성공")
  public async handleListMyReviews(@Request() req: ExpressRequest, @Query() cursor: number = 0): Promise<ApiResponse<ReviewListResponse>> {
    const user = req.user as any;

    const myReview = await handleMyReviews(user.id, cursor);
    return success(myReview);
  }
}
