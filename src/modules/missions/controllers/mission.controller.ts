import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { addMissionRequest, IAddMissionRequest } from "../dtos/mission.dto.js";
import { addStoreMission, handleStoreMissions } from "../services/mission.service.js";

// 가게에 미션 추가하기
export const handleAddMission = async (req: Request, res: Response, next: NextFunction) => {
  console.log("가게 미션 추가를 요청했습니다.");
  console.log("body: ", req.body);

  const mission = await addStoreMission(addMissionRequest(req.body as IAddMissionRequest));

  res.status(StatusCodes.OK).json({ result: mission });
};

// 특정 가게의 미션 목록 조회
export const handleListStoreMissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const storeId = parseInt(req.params.storeId as string, 10);
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor, 10) : 0;

    const missions = await handleStoreMissions(storeId, cursor);

    res.status(StatusCodes.OK).json(missions);
  } catch (err) {
    next(err);
  }
};
