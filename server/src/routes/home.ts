import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      time_stamp: Date.now(),
      data: "Please refer to our documentation for more details: 'https://github.com/AniCrad/indian-rail-api'",
    });
  } catch (err) {
    res.json({ Error: err });
  }
});

export default router;
