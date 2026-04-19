import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IAddStoreRequest, addStoreRequest } from "../dtos/store.dto.js";
import { addRegionStore } from "../services/store.service.js";

// 특정 지역에 가게 추가하기
export const handleAddStore = async (req: Request, res: Response, next: NextFunction) => {
  console.log("특정 지역에 가게 추가 기능 요청");
  console.log("body: ", req.body);

  const store = await addRegionStore(addStoreRequest(req.body as IAddStoreRequest));

  res.status(StatusCodes.OK).json({ result: store });
};
