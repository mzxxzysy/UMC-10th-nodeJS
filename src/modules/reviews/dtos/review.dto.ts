// 리뷰 작성하기
export interface IAddReviewRequest {
  storeId: number;
  body: string;
  score: number;
}

// 리뷰 조회하기
export interface IReviewResponse {
  memberId: number;
  storeId: number;
  body: string;
  score: number;
}
