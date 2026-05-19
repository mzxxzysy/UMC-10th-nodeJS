import { AlreadyRegisterStoreError, NotExistedStoreError } from "../../../common/errors/error.js";
import { IAddStoreRequest, IStoreResponse, ReviewListResponse } from "../dtos/store.dto.js";
import { addStore, getAllStoreReviews, getStore, getStoreMissions } from "../repositories/store.repository.js";

// 특정 지역에 가게 추가하기
export const addRegionStore = async (data: IAddStoreRequest): Promise<IStoreResponse> => {
  const storeId = await addStore({
    regionId: data.regionId,
    name: data.name,
    address: data.address,
  });

  if (storeId === null) {
    throw new AlreadyRegisterStoreError("이미 등록된 가게입니다.");
  }

  const store = await getStore(Number(storeId));

  if (!store) {
    throw new NotExistedStoreError("가게 찾을 수 없습니다.");
  }
  return {
    regionId: Number(store.region_id),
    name: store.name || "",
    address: store.address || "",
    score: store.score ?? undefined,
  };
};

// 가게 리뷰 목록 조회
export const listStoreReviews = async (storeId: number, cursor: number): Promise<ReviewListResponse> => {
  const reviews = await getAllStoreReviews(storeId, cursor);

  const mapped = reviews.map((r) => ({
    id: Number(r.id),
    body: r.body,
    score: Number(r.score),
    userName: r.member?.name || null,
    storeName: r.store?.name || null,
  }));

  return {
    data: mapped,
    pagination: {
      cursor: mapped.at(-1)?.id ?? null,
    },
  };
};

// 특정 가게의 미션 목록 조회
export const handleStoreMissions = async (storeId: number, cursor: number) => {
  const missions = await getStoreMissions(storeId, cursor);

  const mapped = missions.map((m) => ({
    id: Number(m.id),
    storeId: storeId,
    reward: Number(m.reward),
    deadline: m.deadline?.toISOString(),
    missionSpec: m.mission_spec || "",
  }));

  return {
    data: mapped,
    pagination: {
      cursor: mapped.at(-1)?.id ?? null,
    },
  };
};
