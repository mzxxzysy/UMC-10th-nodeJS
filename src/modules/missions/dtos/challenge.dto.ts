// 미션 상태 enum
export enum MissionStatus {
  IN_PROGRESS = "진행중",
  COMPLETED = "진행완료",
}

// 미션 도전하기
export interface IChallengeRequest {
  memberId: number;
  missionId: number;
}

export const challengeRequest = (body: IChallengeRequest) => {
  return {
    memberId: body.memberId,
    missionId: body.missionId,
    status: MissionStatus.IN_PROGRESS,
  };
};

// 미션 조회하기
export interface IChallengeResponse {
  memberId: number;
  missionId: number;
  status: MissionStatus;
}

export const challengeResponse = (body: IChallengeResponse) => {
  return {
    memberId: body.memberId,
    missionId: body.missionId,
    status: body.status,
  };
};

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
