import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 가게에 미션 추가하기
export const addMission = async (data: any): Promise<number> => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query<ResultSetHeader>(`insert into mission (store_id, reward, deadline, mission_spec)  values (?, ?, ?, ?);`, [
      data.storeId,
      data.reward,
      data.deadline,
      data.missionSpec,
    ]);

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 미션 조회
export const getMission = async (missionId: number): Promise<any | null> => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await conn.query<RowDataPacket[]>(`select * from mission where id = ?;`, [missionId]);

    if (mission.length === 0) {
      return null;
    }

    return mission[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};
