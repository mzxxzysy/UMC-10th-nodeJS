import { IAddStoreRequest, storeResponse } from "../dtos/store.dto.js";
import { addStore, getStore } from "../repositories/store.repository.js";

export const addRegionStore = async (data: IAddStoreRequest) => {
  const storeId = await addStore({
    regionId: data.regionId,
    name: data.name,
    address: data.address,
  });

  if (storeId === null) {
    throw new Error("이미 등록된 가게입니다.");
  }

  const store = await getStore(Number(storeId));

  if (!store) {
    throw new Error("가게 찾을 수 없습니다.");
  }

  return storeResponse({
    regionId: Number(store.region_id),
    name: store.name || "",
    address: store.address ?? "",
    score: store.score ?? 0,
  });
};
