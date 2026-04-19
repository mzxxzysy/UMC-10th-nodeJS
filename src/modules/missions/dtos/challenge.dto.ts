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
