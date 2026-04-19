import { IAddMissionRequest, missionResponse } from "../dtos/mission.dto.js";
import { addMission, getMission } from "../repositories/mission.repository.js";

// 가게에 미션 추가하기
export const addStoreMission = async (data: IAddMissionRequest) => {
  const missionId = await addMission({
    storeId: data.storeId,
    reward: data.reward,
    deadline: data.deadline,
    missionSpec: data.missionSpec,
  });

  const mission = await getMission(missionId);

  return missionResponse(mission);
};
