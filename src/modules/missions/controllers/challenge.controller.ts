import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { completeMission, handleMyChallenge } from "../services/challenge.service.js";

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

// 내가 진행 중인 미션을 진행 완료로 바꾸기
export const handleCompleteMission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const missionId = parseInt(req.params.missionId as string, 10);

    const response = await completeMission(missionId);

    res.status(StatusCodes.OK).json(response);
  } catch (err) {
    next(err);
  }
};
