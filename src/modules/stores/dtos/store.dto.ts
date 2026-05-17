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
