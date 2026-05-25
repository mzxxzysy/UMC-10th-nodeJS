import { completeMission, handleMyChallenge } from "../services/challenge.service.js";
import { Controller, Get, Patch, Path, Query, Route, Tags, Response } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { IChallengesResponse, ICompleteMissionResponse } from "../dtos/challenge.dto.js";

@Route("challenges")
@Tags("Challenges")
export class ChallengeController extends Controller {
  /**
   * 내가 진행 중인 미션 목록 조회
   * @summary 내가 진행 중인 미션 목록 조회하는 엔드포인트입니다.
   */
  @Get("{memberId}/missions")
  @Response<ApiResponse<IChallengesResponse>>(200, "미션 조회 성공")
  public async handleListChallenge(@Path() memberId: number, @Query() cursor: number = 0): Promise<ApiResponse<IChallengesResponse>> {
    const challenges = await handleMyChallenge(memberId, cursor);
    return success(challenges);
  }

  /**
   * 미션 진행 완료 처리
   * @summary 미션 진행 완료 처리하는 엔드포인트입니다.
   */
  @Patch("{missionId}/complete")
  @Response<ApiResponse<ICompleteMissionResponse>>(200, "미션 완료 성공")
  public async handleCompleteMission(@Path() missionId: number) {
    const response = await completeMission(missionId);

    return success(response);
  }
}
