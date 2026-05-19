import { AlreadyChallengedMissionError, AlreadyCompletedMissionError, NotExistedMissionError } from "../../../common/errors/error.js";
import { MissionStatus } from "../dtos/challenge.dto.js";
import { IAddMissionRequest, IChallengeRequest, IMissionResponse } from "../dtos/mission.dto.js";
import { addMission, challengeMission, getChallenge, getMission } from "../repositories/mission.repository.js";

// 가게에 미션 추가하기
export const addStoreMission = async (data: IAddMissionRequest): Promise<IMissionResponse> => {
  const missionId = await addMission({
    storeId: data.storeId,
    reward: data.reward,
    deadline: data.deadline,
    missionSpec: data.missionSpec,
  });

  const mission = await getMission(Number(missionId));

  if (!mission) {
    throw new NotExistedMissionError("미션 찾을 수 없습니다.", data);
  }
  return {
    storeId: Number(mission.store_id),
    reward: Number(mission.reward),
    deadline: mission.deadline?.toISOString(),
    missionSpec: mission.mission_spec || "",
  };
};

// 미션 도전하기
export const challengeStoreMission = async (data: IChallengeRequest) => {
  // 도전한 미션 조회
  const mission = await getMission(Number(data.missionId));

  if (!mission) {
    throw new NotExistedMissionError("미션 찾을 수 없습니다.", data);
  }

  const challengeId = await challengeMission({
    memberId: data.memberId,
    missionId: data.missionId,
  });

  // 이미 완료한 미션인지 확인
  if (challengeId === -1) {
    throw new AlreadyCompletedMissionError("이미 완료한 미션입니다.", data);
  }

  // 이미 도전 중인 미션인지 확인
  if (challengeId === -2) {
    throw new AlreadyChallengedMissionError("이미 진행 중인 미션입니다.", data);
  }

  const challenge = await getChallenge(Number(challengeId));

  return {
    memberId: Number(challenge?.member_id),
    missionId: Number(challenge?.mission_id),
    status: challenge?.status as MissionStatus,
  };
};
