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
