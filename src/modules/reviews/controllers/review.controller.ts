import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { addReviewRequest, IAddReviewRequest } from "../dtos/review.dto.js";
import { addStoreReview, handleMyReviews, listStoreReviews } from "../services/review.service.js";

// 리뷰 작성하기
export const handleAddReview = async (req: Request, res: Response, next: NextFunction) => {
  console.log("리뷰 작성을 요청했습니다.");
  console.log("body: ", req.body);

  const review = await addStoreReview(addReviewRequest(req.body as IAddReviewRequest));

  res.status(StatusCodes.OK).json({ result: review });
};

// 가게 리뷰 목록 조회
export const handleListStoreReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const storeId = parseInt(req.params.storeId as string, 10);
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor, 10) : 0;

    const reviews = await listStoreReviews(storeId, cursor);

    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};

// 내가 작성한 리뷰 목록 조회하기
export const handleListMyReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const memberId = parseInt(req.params.memberId as string, 10);
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor, 10) : 0;

    const reviews = await handleMyReviews(memberId, cursor);

    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};
