// 특정 지역에 가게 추가 dto
export interface IAddStoreRequest {
  regionId: number;
  name: string;
  address: string;
}

export const addStoreRequest = (body: IAddStoreRequest) => {
  return {
    regionId: body.regionId,
    name: body.name,
    address: body.address,
  };
};

// 가게 정보 dto
export interface IStoreResponse {
  regionId: number;
  name: string;
  address: string;
  score?: number;
}

export const storeResponse = (body: IStoreResponse) => {
  return {
    regionId: body.regionId,
    name: body.name,
    address: body.address,
    score: body.score || 0,
  };
};
