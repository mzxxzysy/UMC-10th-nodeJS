// 가게에 미션 추가하기
export interface IAddMissionRequest {
  storeId: number;
  reward: number;
  deadline: string;
  missionSpec: string;
}

export const addMissionRequest = (body: IAddMissionRequest) => {
  return {
    storeId: body.storeId,
    reward: body.reward,
    deadline: body.deadline,
    missionSpec: body.missionSpec,
  };
};

export interface IMissionResponse {
  storeId: number;
  reward: number;
  deadline?: string;
  missionSpec: string;
}

export const missionResponse = (body: IMissionResponse) => {
  return {
    storeId: body.storeId,
    reward: body.reward,
    deadline: body.deadline || new Date(),
    missionSpec: body.missionSpec,
  };
};
