import { prisma } from "../../../db.config.js";

// User 데이터 삽입
export const addUser = async (data: any) => {
  // 1. 이미 존재하는 이메일인지 확인
  const user = await prisma.member.findFirst({ where: { email: data.email } });

  if (user) {
    return null;
  }

  // 2. 새로운 유저 생성
  const created = await prisma.member.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      address: data.address,
      spec_address: data.detailAddress,
      phone_num: data.phoneNumber,
      preferences: data.preferences,
    },
  });

  return created.id;
};

// 2. 사용자 정보 얻기
export const getUser = async (userId: number) => {
  return await prisma.member.findFirstOrThrow({ where: { id: userId } });
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, foodCategoryId: number) => {
  await prisma.member_prefer.create({
    data: {
      member_id: userId,
      category_id: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환 (JOIN)
export const getUserPreferencesByUserId = async (userId: number) => {
  return await prisma.member_prefer.findMany({
    where: { member_id: userId },
    include: {
      food_category: true, // 💡 핵심: JOIN 대신 include를 써서 연관 데이터를 가져옵니다!
    },
    orderBy: { category_id: "asc" },
  });
};
