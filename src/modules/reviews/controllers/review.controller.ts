import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { addReviewRequest, IAddReviewRequest } from "../dtos/review.dto.js";
import { addStoreReview, handleMyReviews } from "../services/review.service.js";

// 리뷰 작성하기
export const handleAddReview = async (req: Request, res: Response, next: NextFunction) => {
  console.log("리뷰 작성을 요청했습니다.");
  console.log("body: ", req.body);

  const review = await addStoreReview(addReviewRequest(req.body as IAddReviewRequest));

  res.status(StatusCodes.OK).json({ result: review });
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
