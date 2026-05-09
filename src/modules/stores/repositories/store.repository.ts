import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool, prisma } from "../../../db.config.js";

// 특정 지역에 가게 추가하기
export const addStore = async (data: any) => {
  const store = await prisma.store.findFirst({ where: { name: data.name, region_id: data.regionId } });

  if (store) {
    return null;
  }

  const addStore = await prisma.store.create({
    data: {
      region_id: data.regionId,
      name: data.name,
      address: data.address,
    },
  });

  return addStore.id;
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
