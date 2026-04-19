import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { challengeStoreMission } from "../services/challenge.service.js";
import { challengeRequest, IChallengeRequest } from "../dtos/challenge.dto.js";

// 미션 도전하기
export const handleChallengeMission = async (req: Request, res: Response, next: NextFunction) => {
  console.log("미션 도전을 요청했습니다.");
  console.log("body: ", req.body);

  const challenge = await challengeStoreMission(challengeRequest(req.body as IChallengeRequest));

  res.status(StatusCodes.OK).json({ result: challenge });
};
