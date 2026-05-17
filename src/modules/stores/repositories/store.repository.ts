import { prisma } from "../../../db.config.js";

// 특정 지역에 가게 추가하기
export const addStore = async (data: any) => {
  const store = await prisma.store.findFirst({ where: { name: data.name, region_id: data.regionId } });

  if (store) {
    return null;
  }

  const addStore = await prisma.store.create({
    data: {
      region_id: data.regionId,
      name: data.name,
      address: data.address,
    },
  });

  return addStore.id;
};

// 가게 정보
export const getStore = async (storeId: number) => {
  const store = await prisma.store.findUnique({ where: { id: storeId } });

  return store;
};

// 가게 리뷰 목록 조회
export const getAllStoreReviews = async (store_id: number, cursor: number) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      body: true,
      score: true,
      member: {
        select: {
          id: true,
          name: true,
        },
      },
      store: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      storeId: store_id,
      id: {
        gt: cursor,
      },
    },
    orderBy: {
      id: "asc",
    },
    take: 5,
  });

  return reviews;
};

// 특정 가게의 미션 목록 조회
export const getStoreMissions = async (store_id: number, cursor: number) => {
  const missions = await prisma.mission.findMany({
    select: {
      id: true,
      reward: true,
      deadline: true,
      mission_spec: true,
    },
    where: {
      store_id,
      id: {
        gt: cursor,
      },
    },
    orderBy: {
      id: "asc",
    },
    take: 5,
  });

  return missions;
};
