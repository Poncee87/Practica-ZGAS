import express from "express";

const router = express.Router();

router.route("/").post();

router.route("/verifyCodeEmail").post();

export default router;