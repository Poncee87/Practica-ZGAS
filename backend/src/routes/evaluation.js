import express from "express";
const router = express.Router();

import evaluacionesController from "../controllers/evaluacionesController";

router
.route("/")
.get(evaluacionesController.getevaluation)
.post(evaluacionesController.insertevaluation);

router
.route("/:id")
.put(evaluacionesController.updateevaluation)
.delete(evaluacionesController.deleteevaluation);

export default router;