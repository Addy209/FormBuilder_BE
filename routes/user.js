import { Router } from "express";
import { pingToCheckUser, createUser } from "../controllers/users.js";

const router = Router();

router.get("/ping", pingToCheckUser);
router.post("/create", createUser);

export default router;
