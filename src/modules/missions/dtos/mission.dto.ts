import { MissionStatus } from "./challenge.dto.js";

// 가게에 미션 추가하기
export interface IAddMissionRequest {
  storeId: number;
  reward: number;
  deadline: string;
  missionSpec: string;
}

export interface IMissionResponse {
  storeId: number;
  reward: number;
  deadline?: string;
  missionSpec: string;
}

// 미션 도전하기
export interface IChallengeRequest {
  missionId: number;
}

// 미션 조회하기
export interface IChallengeResponse {
  missionId: number;
  status: MissionStatus;
}
