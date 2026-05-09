import { responseFromReviews, ReviewListResponse } from "../dtos/storeReview.dto.js";
import { getAllStoreReviews } from "../repositories/storeReview.repository.js";

export const listStoreReviews = async (storeId: number, cursor: number): Promise<ReviewListResponse> => {
  const reviews = await getAllStoreReviews(storeId, cursor);

  const mapped = reviews.map((r) => ({
    id: Number(r.id),
    body: r.body,
  }));

  return responseFromReviews(mapped);
};
