import { prisma } from "../../../db.config.js";
import { MissionStatus } from "../dtos/challenge.dto.js";

// 미션 도전하기
export const challengeMission = async (data: any) => {
  // 이미 도전 중인지 확인
  const confirm = await prisma.member_mission.findFirst({ where: { member_id: data.memberId, mission_id: data.missionId } });

  if (confirm) {
    return null;
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

// 도전 중인 미션 조회
export const getChallenge = async (challengeId: number) => {
  const challenge = await prisma.member_mission.findUnique({ where: { id: challengeId } });

  return challenge;
};
