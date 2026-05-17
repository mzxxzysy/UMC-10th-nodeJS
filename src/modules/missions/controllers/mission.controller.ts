import { IAddMissionRequest, IChallengeRequest, IChallengeResponse, IMissionResponse } from "../dtos/mission.dto.js";
import { addStoreMission, challengeStoreMission } from "../services/mission.service.js";
import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";

// 가게에 미션 추가하기
@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  // 가게에 미션 추가하기
  @Post("")
  public async handleAddMission(@Body() body: IAddMissionRequest): Promise<ApiResponse<IMissionResponse>> {
    console.log("가게 미션 추가를 요청했습니다.");
    console.log("body: ", body);

    const mission = await addStoreMission(body);
    return success(mission);
  }

  // 미션 도전하기
  @Post("challenge")
  public async handleChallengeMission(@Body() body: IChallengeRequest): Promise<ApiResponse<IChallengeResponse>> {
    console.log("미션 도전을 요청했습니다.");
    console.log("body: ", body);

    const challenge = await challengeStoreMission(body);
    return success(challenge);
  }
}
