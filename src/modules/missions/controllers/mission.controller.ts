import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { addMissionRequest, IAddMissionRequest } from "../dtos/mission.dto.js";
import { addStoreMission } from "../services/mission.service.js";

// 가게에 미션 추가하기
export const handleAddMission = async (req: Request, res: Response, next: NextFunction) => {
  console.log("가게 미션 추가를 요청했습니다.");
  console.log("body: ", req.body);

  const mission = await addStoreMission(addMissionRequest(req.body as IAddMissionRequest));

  res.status(StatusCodes.OK).json({ result: mission });
};
