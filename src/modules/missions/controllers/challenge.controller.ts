import { completeMission, handleMyChallenge } from "../services/challenge.service.js";
import { Controller, Get, Patch, Path, Query, Route, Tags, Request, Response, Middlewares } from "tsoa";
import { Request as ExpressRequest } from "express";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { IChallengesResponse, ICompleteMissionResponse } from "../dtos/challenge.dto.js";
import { isLogin } from "../../../common/middlewares/auth.middleware.js";

@Route("challenges")
@Tags("Challenges")
export class ChallengeController extends Controller {
  /**
   * 내가 진행 중인 미션 목록 조회
   * @summary 내가 진행 중인 미션 목록 조회하는 엔드포인트입니다.
   */
  @Get("me/missions")
  @Middlewares(isLogin)
  @Response<ApiResponse<IChallengesResponse>>(200, "미션 조회 성공")
  public async handleListChallenge(@Request() req: ExpressRequest, @Query() cursor: number = 0): Promise<ApiResponse<IChallengesResponse>> {
    const user = req.user as any;
    const challenges = await handleMyChallenge(Number(user.id), cursor);
    return success(challenges);
  }

  /**
   * 미션 진행 완료 처리
   * @summary 미션 진행 완료 처리하는 엔드포인트입니다.
   */
  @Patch("{missionId}/complete")
  @Middlewares(isLogin)
  @Response<ApiResponse<ICompleteMissionResponse>>(200, "미션 완료 성공")
  public async handleCompleteMission(@Request() req: ExpressRequest, @Path() missionId: number) {
    const user = req.user as any;
    const response = await completeMission(missionId, Number(user.id));

    return success(response);
  }
}
