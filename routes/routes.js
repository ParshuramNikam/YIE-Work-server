const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { meet } = require("../Meeting/meeting");

router.get("/getlinks", async (req, res) => {
	const classes = await meet.find().sort({ startTime: 1 });
	res.status(200).json(classes);
});

router.post("/getlinksbyclass/", async (req, res) => {
	const m1 = await meet.find({ class: req.body.class }).sort("startTime");
	res.status(200).json(m1);
});

router.post("/createclass", async (req, res) => {
	let m1 = new meet({
		URL: req.body.URL,
		Id: req.body.ID,
		startTime: req.body.startTime,
		class: req.body.class,
        TeacherName: req.body.TeacherName,
        Subject: req.body.Subject
	});
	const p1 = await m1.save();
	res.status(201).send(p1);
});

router.delete("/deleteSession/id/:id", async (req, res) => {
	const m1 = await meet.findByIdAndRemove(req.params.id);

	if (!m1)
		return res
			.status(404)
			.send("The product with the given ID was not found.");

	res.json({ staus: "Sucesss", message: "Deleted SUccesfully", deletedSession: m1 }).status(200);
});

module.exports = router;
