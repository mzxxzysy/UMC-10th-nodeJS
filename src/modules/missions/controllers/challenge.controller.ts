import { completeMission, handleMyChallenge } from "../services/challenge.service.js";
import { Controller, Get, Patch, Path, Query, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { IChallengesResponse } from "../dtos/challenge.dto.js";

@Route("challenges")
@Tags("Challenges")
export class ChallengeController extends Controller {
  // 내가 진행 중인 미션 목록 조회
  @Get("{memberId}/missions")
  public async handleListChallenge(@Path() memberId: number, @Query() cursor: number = 0): Promise<ApiResponse<IChallengesResponse>> {
    const challenges = await handleMyChallenge(memberId, cursor);
    return success(challenges);
  }

  // 진행 완료 처리
  @Patch("{missionId}/complete")
  public async handleCompleteMission(@Path() missionId: number) {
    const response = await completeMission(missionId);

    return success(response);
  }
}
