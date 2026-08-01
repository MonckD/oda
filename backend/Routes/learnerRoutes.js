import express from "express"
import {createLearner,readLearner,getByIdLearner,updateLearner,deleteLearner,searchLearnerByNom} from "../Controllers/learnerControllers.js"

const router = express.Router();

router.post("/learner",createLearner);
router.get("/learners",readLearner);
router.get("/learner/:id",getByIdLearner);
router.put("/:id",updateLearner);
router.delete("/:id",deleteLearner);
router.get("/search", searchLearnerByNom);


export default router;