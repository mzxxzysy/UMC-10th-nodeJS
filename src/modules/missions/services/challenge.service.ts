import { challengeResponse, IChallengeRequest } from "../dtos/challenge.dto.js";
import { challengeMission, getChallenge } from "../repositories/challenge.repository.js";

//미션 도전하기
export const challengeStoreMission = async (data: IChallengeRequest) => {
  const challengeId = await challengeMission({
    memberId: data.memberId,
    missionId: data.missionId,
  });

  // 이미 도전 중인 미션인지 확인
  if (challengeId === null) {
    throw new Error("이미 진행 중인 미션입니다.");
  }

  // 도전한 미션 조회
  const mission = await getChallenge(challengeId);

  return challengeResponse(mission);
};
