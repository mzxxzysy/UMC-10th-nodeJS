import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 특정 지역에 가게 추가하기
export const addStore = async (data: any): Promise<number | null> => {
  const conn = await pool.getConnection();

  try {
    // 해당 지역에 등록된 가게인지 확인
    const [confirm] = await conn.query<RowDataPacket[]>(`select exists(select 1 from store where name = ? and region_id = ?) as isExistStore`, [
      data.name,
      data.regionId,
    ]);

    if (confirm[0]?.isExistStore) {
      return null;
    }

    // 지역에 가게 추가
    const [result] = await conn.query<ResultSetHeader>(`insert into store (region_id, name, address) values (?, ?, ?);`, [
      data.regionId,
      data.name,
      data.address,
    ]);

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 가게 정보
export const getStore = async (storeId: number): Promise<any | null> => {
  const conn = await pool.getConnection();

  try {
    const [store] = await conn.query<RowDataPacket[]>(`select * from store where id = ?;`, [storeId]);

    if (store.length === 0) {
      return null;
    }

    return store[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};
