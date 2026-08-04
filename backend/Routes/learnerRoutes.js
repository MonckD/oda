import express from "express"
import {createLearner,readLearner,getByIdLearner,updateLearner,deleteLearner,searchLearner} from "../Controllers/learnerControllers.js"

const router = express.Router();

router.post("/learner",createLearner);
router.get("/learners",readLearner);
router.get("/learner/:id",getByIdLearner);
router.put("/learner/:id",updateLearner);
router.delete("/learner/:id",deleteLearner);
router.get("/search", searchLearner);


export default router;
