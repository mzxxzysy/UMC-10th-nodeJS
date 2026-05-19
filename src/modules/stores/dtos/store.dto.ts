import { IMissionResponse } from "../../missions/dtos/mission.dto.js";

// 특정 지역에 가게 추가 dto
export interface IAddStoreRequest {
  regionId: number;
  name: string;
  address: string;
}

// 가게 정보 dto
export interface IStoreResponse {
  regionId: number;
  name: string;
  address: string;
  score?: number;
}

// 리뷰 목록 조회
export interface ReviewItem {
  id: number;
  body: string | null;
  score: number;
  userName: string | null;
  storeName: string | null;
}

export interface ReviewListResponse {
  data: ReviewItem[];
  pagination: {
    cursor: number | null;
  };
}

// 미션 목록 조회
export interface missionItem {
  id: number;
  storeId: number;
  reward: number;
  deadline?: string;
  missionSpec: string;
}

export interface MissionsListResponse {
  data: IMissionResponse[];
  pagination: {
    cursor: number | null;
  };
}
