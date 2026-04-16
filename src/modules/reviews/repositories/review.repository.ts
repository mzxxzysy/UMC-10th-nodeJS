import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 리뷰 작성하기
export const addReview = async (data: any): Promise<number | null> => {
  const conn = await pool.getConnection();

  try {
    // 해당 가게가 있는지 확인
    const [confirm] = await conn.query<RowDataPacket[]>(`select exists(select 1 from store where id = ?) as isExistStore;`, [data.storeId]);

    if (!confirm[0]?.isExistStore) {
      return null;
    }

    // 리뷰 작성하기
    const [result] = await conn.query<ResultSetHeader>(`insert into review (member_id, store_id, body, score) values (?, ?, ?, ?);`, [
      data.memberId,
      data.storeId,
      data.body,
      data.score,
    ]);

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
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
