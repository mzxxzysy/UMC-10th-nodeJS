// 미션 상태 enum
export enum MissionStatus {
  IN_PROGRESS = "진행중",
  COMPLETED = "진행완료",
}

// 미션 목록 조회
export interface ChallengeItem {
  challengeId: number;
  status: string;

  mission: {
    missionId: number;
    reward: number;
    deadline?: string;
    missionSpec: string;

    store: {
      storeId: number;
      name: string;
    };
  };
}

export interface IChallengesResponse {
  data: ChallengeItem[];
  pagination: {
    cursor: number | null;
  };
}

export const challengesResponse = (challenges: ChallengeItem[]): IChallengesResponse => {
  const lastChallenge = challenges[challenges.length - 1];

  return {
    data: challenges,

    pagination: {
      cursor: lastChallenge ? lastChallenge.challengeId : null,
    },
  };
};

// 미션 진행 완료
export interface ICompleteMissionResponse {
  challengeId: number;
  status: MissionStatus;
}

export const completeMissionResponse = (body: ICompleteMissionResponse) => {
  return {
    challengeId: body.challengeId,
    status: body.status,
  };
};
