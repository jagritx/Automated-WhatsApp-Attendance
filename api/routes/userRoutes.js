import express from "express";
import addUser from "../controllers/addUser.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("API Works").status(200);
});

router.post("/addUser", addUser);

export default router;
