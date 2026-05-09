import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";
import { prisma } from "../../../db.config.js";

// 리뷰 작성하기
export const addReview = async (data: any) => {
  // 해당 가게가 있는지 확인
  const store = await prisma.store.findFirst({ where: { id: data.store_id } });

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
export const getReview = async (reviewId: number): Promise<any | null> => {
  const conn = await pool.getConnection();

  try {
    const [review] = await conn.query<RowDataPacket[]>(`select * from review where id = ?;`, [reviewId]);

    if (review.length === 0) {
      return null;
    }

    return review[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};
