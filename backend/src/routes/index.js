import { Router } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import classroomsRouter from "./classrooms";
import resourcesRouter from "./resources";
import tokensRouter from "./tokens";
import notificationsRouter from "./notifications";
import uploadRouter from "./upload";
import dashboardRouter from "./dashboard";
const router = Router();
router.use(healthRouter);
router.use(authRouter);
router.use(classroomsRouter);
router.use(resourcesRouter);
router.use(tokensRouter);
router.use(notificationsRouter);
router.use(uploadRouter);
router.use(dashboardRouter);
var stdin_default = router;
export {
  stdin_default as default
};
