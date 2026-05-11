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

// 미션 목록 조회
export interface missionItem {
  id: number;
  storeId: number;
  reward: number;
  deadline?: string;
  missionSpec: string;
}

export const responseMissions = (missions: missionItem[]): MissionsListResponse => {
  const lastMission = missions[missions.length - 1];

  return {
    data: missions,
    pagination: {
      cursor: lastMission ? lastMission.id : null,
    },
  };
};

export interface MissionsListResponse {
  data: IMissionResponse[];
  pagination: {
    cursor: number | null;
  };
}
