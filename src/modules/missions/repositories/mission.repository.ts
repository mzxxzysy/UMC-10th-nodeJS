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
