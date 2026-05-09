import { prisma } from "../../../db.config.js";

// 리뷰 작성하기
export const addReview = async (data: any) => {
  // 해당 가게가 있는지 확인
  const store = await prisma.store.findFirst({ where: { id: data.storeId } });

  if (!store) {
    return null;
  }

  // 리뷰 작성하기
  const review = await prisma.review.create({
    data: {
      memberId: data.memberId,
      storeId: data.storeId,
      body: data.body,
      score: data.score,
    },
  });

  return review.id;
};

// 리뷰 조회
export const getReview = async (reviewId: number) => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });

  return review;
};
