import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { challengeStoreMission, handleMyChallenge } from "../services/challenge.service.js";
import { challengeRequest, IChallengeRequest } from "../dtos/challenge.dto.js";

// 미션 도전하기
export const handleChallengeMission = async (req: Request, res: Response, next: NextFunction) => {
  console.log("미션 도전을 요청했습니다.");
  console.log("body: ", req.body);

  const challenge = await challengeStoreMission(challengeRequest(req.body as IChallengeRequest));

  res.status(StatusCodes.OK).json({ result: challenge });
};

// 내가 진행 중인 미션 목록 조회
export const handleListChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const memberId = parseInt(req.params.memberId as string, 10);
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor, 10) : 0;

    const challenges = await handleMyChallenge(memberId, cursor);

    res.status(StatusCodes.OK).json(challenges);
  } catch (err) {
    next(err);
  }
};
