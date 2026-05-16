import "express";

declare module "express-serve-static-core" {
  interface Response {
    error: (args: { errorCode?: string | null; message?: string | null; data?: unknown }) => Response;
  }
}
