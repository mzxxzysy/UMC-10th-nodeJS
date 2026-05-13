import { prisma } from "../../../db.config.js";

// 가게에 미션 추가하기
export const addMission = async (data: any) => {
  const mission = await prisma.mission.create({
    data: {
      store_id: data.storeId,
      reward: data.reward,
      deadline: new Date(data.deadline),
      mission_spec: data.missionSpec,
    },
  });

  return mission.id;
};

// 미션 조회
export const getMission = async (missionId: number) => {
  const mission = await prisma.mission.findUnique({ where: { id: missionId } });

  return mission;
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
