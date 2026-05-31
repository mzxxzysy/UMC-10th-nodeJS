import { IAddMissionRequest, IChallengeRequest, IChallengeResponse, IMissionResponse } from "../dtos/mission.dto.js";
import { addStoreMission, challengeStoreMission } from "../services/mission.service.js";
import { Body, Controller, Post, Route, Tags, Request, Response, Middlewares } from "tsoa";
import { Request as ExpressRequest } from "express";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { isLogin } from "../../../common/middlewares/auth.middleware.js";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  /**
   * 가게에 미션 추가하기
   * @summary 가게에 미션을 추가하는 엔드포인트입니다.
   */
  @Post("")
  @Middlewares(isLogin)
  @Response<ApiResponse<IMissionResponse>>(200, "미션 추가 성공")
  public async handleAddMission(@Body() body: IAddMissionRequest): Promise<ApiResponse<IMissionResponse>> {
    console.log("가게 미션 추가를 요청했습니다.");
    console.log("body: ", body);

    const mission = await addStoreMission(body);
    return success(mission);
  }

  /**
   * 미션 도전하기
   * @summary 미션을 도전하는 엔드포인트입니다.
   */
  @Post("challenge")
  @Middlewares(isLogin)
  @Response<ApiResponse<IChallengeResponse>>(200, "미션 도전 성공")
  @Response<ApiResponse<null>>(404, "존재하지 않는 미션 에러")
  @Response<ApiResponse<null>>(404, "이미 도전하거나 완료한 미션 에러")
  public async handleChallengeMission(@Request() req: ExpressRequest, @Body() body: IChallengeRequest): Promise<ApiResponse<IChallengeResponse>> {
    console.log("미션 도전을 요청했습니다.");
    console.log("body: ", body);

    const user = req.user as any;
    const challenge = await challengeStoreMission(body, user.id);
    return success(challenge);
  }
}
