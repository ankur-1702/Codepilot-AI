const express=require('express');
const aiController=require("../controllers/ai.controller.js");
const router=express.Router();

router.post("/get-review",aiController.getReview)
router.post("/get-review/stream",aiController.getReviewStream)


module.exports=router;