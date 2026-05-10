import { challengeResponse, IChallengeRequest, MissionStatus } from "../dtos/challenge.dto.js";
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
  const mission = await getChallenge(Number(challengeId));

  if (!mission) {
    throw new Error("미션 찾을 수 없습니다.");
  }

  return challengeResponse({
    memberId: Number(mission.member_id),
    missionId: Number(mission.mission_id),
    status: MissionStatus.IN_PROGRESS,
  });
};
