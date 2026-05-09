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
