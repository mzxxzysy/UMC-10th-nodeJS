import { UserInfoResponse, UserRequest, UserSignUpResponse } from "../dtos/user.dto.js"; //인터페이스 가져오기
import { addUser, getUser, getUserPreferencesByUserId, setPreference, updateUserInfo } from "../repositories/user.repository.js";
import { DuplicateUserEmailError } from "../../../common/errors/error.js";

export const userSignUp = async (data: UserRequest): Promise<UserSignUpResponse> => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth ? new Date(data.birth) : undefined,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
    preferences: data.preferences,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences ?? []) {
    await setPreference(Number(joinUserId), preference);
  }

  const user = await getUser(Number(joinUserId));
  const userId = Number(user!.id);
  const preferences = (await getUserPreferencesByUserId(Number(joinUserId)))
    .map((obj) => obj.food_category?.name)
    .filter((name): name is string => name != null);

  return {
    userId,
    preferences,
  };
};

// 회원 정보 수정하기
export const updateUser = async (memberId: number, data: UserRequest): Promise<UserInfoResponse> => {
  const user = await updateUserInfo(memberId, {
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth ? new Date(data.birth) : undefined,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
    preferences: data.preferences,
  });

  return {
    userId: Number(user.id),
    name: user.name || "",
    gender: user.gender || "",
    birth: user.birth,
    address: user.address || "",
    detailAddress: user.spec_address || "",
    phoneNumber: user.phone_num || "",
  };
};
