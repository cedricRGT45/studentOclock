import { Router } from "express";
import { dashboardView } from "../controllers/dashboardController.js";
import { projectDetailView } from "../controllers/projectDetailController.js";

const router = Router();

router.get("/", dashboardView);
router.get("/project/:id(\\d+)", projectDetailView);//(\\d+)=>associé à une expression régulière

export default router;
