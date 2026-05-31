import { prisma } from "../../../db.config.js";
import { MissionStatus } from "../dtos/challenge.dto.js";

// 내가 진행 중인 미션 목록 조회
export const getMyChallenges = async (memberId: number, cursor: number) => {
  const challenges = await prisma.member_mission.findMany({
    where: {
      member_id: memberId,
      status: "진행중",
      id: {
        gt: cursor,
      },
    },

    select: {
      id: true,
      status: true,

      mission: {
        select: {
          id: true,
          reward: true,
          deadline: true,
          mission_spec: true,

          store: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },

    orderBy: {
      id: "asc",
    },

    take: 5,
  });

  return challenges;
};

// 내가 진행 중인 미션을 진행 완료로 바꾸기
export const updateMissionStatus = async (memberMissionId: number, memberId: number) => {
  const mission = await prisma.member_mission.findFirst({
    where: {
      id: memberMissionId,
      member_id: memberId,
    },
  });

  if (!mission) {
    throw new Error("본인의 진행 중인 미션이 아닙니다.");
  }

  const updated = await prisma.member_mission.update({
    where: {
      id: memberMissionId,
    },

    data: {
      status: MissionStatus.COMPLETED,
    },

    select: {
      id: true,
      status: true,
    },
  });

  return updated;
};
