import dotenv from "dotenv";
import { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { RegisterRoutes } from "./generated/routes.js";
// import { handleUserSignUp } from "./modules/users/controllers/user.controller.js";
import { handleAddStore } from "./modules/stores/controllers/store.controller.js";
import { handleAddReview, handleListMyReviews, handleListStoreReviews } from "./modules/reviews/controllers/review.controller.js";
import { handleAddMission, handleListStoreMissions } from "./modules/missions/controllers/mission.controller.js";
import { handleChallengeMission, handleCompleteMission, handleListChallenge } from "./modules/missions/controllers/challenge.controller.js";

// 1. 환경 변수 설정
dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
const port = process.env.PORT || 3000;

// 2. 미들웨어 설정
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// Express.js에 생성한 엔드 포인트들을 register
const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

// app.post("/api/v1/users/signup", handleUserSignUp); // 회원가입
app.post("/api/v1/stores", handleAddStore); // 특정 지역에 가게 추가하기
app.post("/api/v1/reviews", handleAddReview); // 가게에 리뷰 추가하기
app.post("/api/v1/missions", handleAddMission); // 가게에 미션 추가하기
app.post("/api/v1/missions/challenge", handleChallengeMission); // 가게의 미션을 도전 중인 미션에 추가(미션 도전하기)
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews); // 가게 리뷰 조회하기
app.get("/api/v1/reviews/:memberId", handleListMyReviews); // 내가 작성한 리뷰 조회하기
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions); // 특정 가게의 미션 목록 조회
app.get("/api/v1/members/:memberId/missions", handleListChallenge); // 내가 진행 중인 미션 목록 조회
app.patch("/api/v1/members/:missionId", handleCompleteMission); // 내가 진행 중인 미션을 진행 완료로 바꾸기

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});
