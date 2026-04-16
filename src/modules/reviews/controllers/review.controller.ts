import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { addReviewRequest, IAddReviewRequest } from "../dtos/review.dto.js";
import { addStoreReview } from "../services/review.service.js";

// 리뷰 작성하기
export const handleAddReview = async (req: Request, res: Response, next: NextFunction) => {
  console.log("리뷰 작성을 요청했습니다.");
  console.log("body: ", req.body);

  const review = await addStoreReview(addReviewRequest(req.body as IAddReviewRequest));

  res.status(StatusCodes.OK).json({ result: review });
};
