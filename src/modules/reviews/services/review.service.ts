import { NotExistedStoreError } from "../../../common/errors/error.js";
import { IAddReviewRequest, IReviewResponse } from "../dtos/review.dto.js";
import { addReview, getMyReviews, getReview } from "../repositories/review.repository.js";

// 리뷰 작성하기
export const addStoreReview = async (data: IAddReviewRequest): Promise<IReviewResponse> => {
  const reviewId = await addReview({
    memberId: data.memberId,
    storeId: data.storeId,
    body: data.body,
    score: data.score,
  });

  // 존재하는 가게인지 검증
  if (reviewId === null) {
    throw new NotExistedStoreError("해당 가게가 존재하지 않습니다.");
  }

  // 등록된 리뷰 조회
  const review = await getReview(Number(reviewId));

  if (!review) {
    throw new Error("리뷰를 찾을 수 없습니다.");
  }

  return {
    memberId: Number(review.memberId),
    storeId: Number(review.storeId),
    body: review.body || "",
    score: review.score || 0,
  };
};

// 내가 작성한 리뷰 조회
export const handleMyReviews = async (memberId: number, cursor: number) => {
  const reviews = await getMyReviews(memberId, cursor);

  const mapped = reviews.map((r) => ({
    id: Number(r.id),
    body: r.body,
    score: Number(r.score),
    userName: r.member?.name || null,
    storeName: r.store?.name || null,
  }));

  return {
    data: mapped,
    pagination: {
      cursor: mapped.at(-1)?.id ?? null,
    },
  };
};
