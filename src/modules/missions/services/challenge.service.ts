import { challengesResponse, completeMissionResponse, MissionStatus } from "../dtos/challenge.dto.js";
import { getMyChallenges, updateMissionStatus } from "../repositories/challenge.repository.js";

// 내가 진행 중인 미션 목록 조회
export const handleMyChallenge = async (memberId: number, cursor: number) => {
  const challenges = await getMyChallenges(memberId, cursor);

  const mapped = challenges.map((c) => ({
    challengeId: Number(c.id),
    status: c.status || "",
    mission: {
      missionId: Number(c.mission?.id),
      reward: c.mission?.reward || 0,
      deadline: c.mission?.deadline?.toISOString(),
      missionSpec: c.mission?.mission_spec || "",
      store: {
        storeId: Number(c.mission?.store?.id),
        name: c.mission?.store?.name || "",
      },
    },
  }));

  return challengesResponse(mapped);
};

// 내가 진행 중인 미션을 진행 완료로 바꾸기
export const completeMission = async (memberMissionId: number) => {
  const mission = await updateMissionStatus(memberMissionId);

  return completeMissionResponse({
    challengeId: Number(mission.id),

    status: mission.status as MissionStatus,
  });
};
