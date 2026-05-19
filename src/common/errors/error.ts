import { appendFile } from "node:fs";
import { AppError } from "./app.error.js";

// 이미 가입된 이메일 에러
export class DuplicateUserEmailError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "U001",
      statusCode: 409,
      message,
      data,
    });
  }
}

// 이미 등록된 가게 에러
export class AlreadyRegisterStoreError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "S001",
      statusCode: 404,
      message,
      data,
    });
  }
}

// 존재하지 않는 가게 에러
export class NotExistedStoreError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "S002",
      statusCode: 404,
      message,
      data,
    });
  }
}

// 존재하지 않는 리뷰 에러
export class NotExistedReviewError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "R001",
      statusCode: 404,
      message,
      data,
    });
  }
}

// 존재하지 않는 미션 에러
export class NotExistedMissionError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "M001",
      statusCode: 404,
      message,
      data,
    });
  }
}

// 이미 도전 중인 미션 에러
export class AlreadyChallengedMissionError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "M002",
      statusCode: 404,
      message,
      data,
    });
  }
}

// 이미 완료한 미션 에러
export class AlreadyCompletedMissionError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "M003",
      statusCode: 404,
      message,
      data,
    });
  }
}
