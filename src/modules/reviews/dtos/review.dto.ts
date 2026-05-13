// 리뷰 작성하기
export interface IAddReviewRequest {
  memberId: number;
  storeId: number;
  body: string;
  score: number;
}

export const addReviewRequest = (body: IAddReviewRequest) => {
  return {
    memberId: body.memberId,
    storeId: body.storeId,
    body: body.body,
    score: body.score,
  };
};

// 리뷰 조회하기
export interface IReviewResponse {
  memberId: number;
  storeId: number;
  body: string;
  score: number;
}

export const reviewResponse = (body: IReviewResponse) => {
  return {
    memberId: body.memberId,
    storeId: body.storeId,
    body: body.body,
    score: body.score,
  };
};

// 리뷰 목록 조회
export interface ReviewItem {
  id: number;
  body: string | null;
  score: number;
  userName: string | null;
  storeName: string | null;
}

export const responseFromReviews = (reviews: ReviewItem[]): ReviewListResponse => {
  const lastReview = reviews[reviews.length - 1];

  return {
    data: reviews,
    pagination: {
      cursor: lastReview ? lastReview.id : null,
    },
  };
};

export interface ReviewListResponse {
  data: ReviewItem[];
  pagination: {
    cursor: number | null;
  };
}
