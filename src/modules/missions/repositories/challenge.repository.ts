import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";
import { MissionStatus } from "../dtos/challenge.dto.js";

// 미션 도전하기
export const challengeMission = async (data: any): Promise<number | null> => {
  const conn = await pool.getConnection();

  try {
    // 이미 도전 중인지 확인
    const [confirm] = await conn.query<RowDataPacket[]>(
      `select exists(select 1 from member_mission where member_id = ? and mission_id = ?) as isExistMission;`,
      [data.memberId, data.missionId],
    );

    if (confirm[0]?.isExistMission) {
      return null;
    }

    // 미션 도전하기
    const [result] = await conn.query<ResultSetHeader>(`insert into member_mission (member_id, mission_id, status) values (?, ?, ?);`, [
      data.memberId,
      data.missionId,
      MissionStatus.IN_PROGRESS,
    ]);

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 도전 중인 미션 조회
export const getChallenge = async (challengeId: number): Promise<any | null> => {
  const conn = await pool.getConnection();

  try {
    const [challenge] = await conn.query<RowDataPacket[]>(`select * from member_mission where id = ?;`, [challengeId]);

    if (challenge.length === 0) {
      return null;
    }

    return challenge[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};
