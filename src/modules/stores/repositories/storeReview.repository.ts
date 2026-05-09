import { prisma } from "../../../db.config.js";

export const getAllStoreReviews = async (store_id: number, cursor: number) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      body: true,
      store: true,
      member: true,
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

  return reviews;
};
