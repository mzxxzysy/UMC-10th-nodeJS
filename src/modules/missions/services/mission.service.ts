import { IAddMissionRequest, missionResponse, responseMissions } from "../dtos/mission.dto.js";
import { addMission, getMission, getStoreMissions } from "../repositories/mission.repository.js";

// 가게에 미션 추가하기
export const addStoreMission = async (data: IAddMissionRequest) => {
  const missionId = await addMission({
    storeId: data.storeId,
    reward: data.reward,
    deadline: data.deadline,
    missionSpec: data.missionSpec,
  });

  const mission = await getMission(Number(missionId));

  if (!mission) {
    throw new Error("미션 찾을 수 없습니다.");
  }
  return missionResponse({
    storeId: Number(mission.store_id),
    reward: Number(mission.reward),
    deadline: mission.deadline ? mission.deadline.toISOString() : undefined,
    missionSpec: mission.mission_spec || "",
  });
};

// 특정 가게의 미션 목록 조회
export const handleStoreMissions = async (storeId: number, cursor: number) => {
  const missions = await getStoreMissions(storeId, cursor);

  const mapped = missions.map((m) => ({
    id: Number(m.id),
    storeId: storeId,
    reward: Number(m.reward),
    deadline: m.deadline?.toISOString(),
    missionSpec: m.mission_spec || "",
  }));

  return responseMissions(mapped);
};
