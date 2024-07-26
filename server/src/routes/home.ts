import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, resp: Response) => {
  resp.json({
    success: true,
    time_stamp: Date.now(),
    data: "please refer our doc for more details('https://github.com/AniCrad/indian-rail-api')",
  });
});

export default router;
