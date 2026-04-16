import { IAddReviewRequest, reviewResponse } from "../dtos/review.dto.js";
import { addReview, getReview } from "../repositories/review.repository.js";

// 리뷰 작성하기
export const addStoreReview = async (data: IAddReviewRequest) => {
  const reviewId = await addReview({
    memberId: data.memberId,
    storeId: data.storeId,
    body: data.body,
    score: data.score,
  });

  // 존재하는 가게인지 검증
  if (reviewId === null) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  // 등록된 리뷰 조회
  const review = await getReview(reviewId);

  return reviewResponse(review);
};
