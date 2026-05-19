import { prisma } from "../../../db.config.js";
import { MissionStatus } from "../dtos/challenge.dto.js";

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

// 미션 도전하기
export const challengeMission = async (data: any) => {
  // 이미 완료한 미션인지 확인
  const complete = await prisma.member_mission.findFirst({
    where: { member_id: data.memberId, mission_id: data.missionId, status: MissionStatus.COMPLETED },
  });
  if (complete) {
    return -1;
  }
  // 이미 도전 중인지 확인
  const confirm = await prisma.member_mission.findFirst({ where: { member_id: data.memberId, mission_id: data.missionId, status: MissionStatus.IN_PROGRESS } });

  if (confirm) {
    return -2;
  }

  // 미션 도전하기
  const challenge = await prisma.member_mission.create({
    data: {
      member_id: data.memberId,
      mission_id: data.missionId,
      status: MissionStatus.IN_PROGRESS,
    },
  });

  return challenge.id;
};

// 도전 중인 미션 개별조회
export const getChallenge = async (challengeId: number) => {
  const challenge = await prisma.member_mission.findUnique({ where: { id: challengeId } });

  return challenge;
};
