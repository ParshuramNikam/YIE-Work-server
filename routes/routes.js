const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { meet } = require("../Meeting/meeting");

router.get("/getlinks", async (req, res) => {
	try {
		const classes = await meet.find().sort({ startTime: 1 });
		res.status(200).json(classes);
	} catch (error) {
		res.status(400).send({
			status: "fail",
			message: error.message,
			error: error,
		});
	}
});

router.get("getlinks/byClassAndTeacher/", async (req, res) => {
	try {
		const { teacher, classYear } = req.body;
		if (!teacher || !classYear)
			return res.status(400).send({
				status: "fail",
				message: "classYear and teacher, both the fields are required",
			});

		const data = await meet
			.find({ $and: [{ TeacherName: teacher }, { class: classYear }] })
			.sort("startTime");

		res.status(200).json(data);
	} catch (error) {
		res.status(400).send({
			status: "fail",
			message: error.message,
			error: error,
		});
	}
});

router.post("/getlinks/class/", async (req, res) => {
	try {
		const m1 = await meet.find({ class: req.body.class }).sort("startTime");
		res.status(200).json(m1);
	} catch (error) {
		res.status(400).send({
			status: "fail",
			message: error.message,
			error: error,
		});
	}
});

router.post("/getlinks/teacher/", async (req, res) => {
	try {
		const { teacher } = req.body;

		const data = await meet
			.find({TeacherName: teacher })
			.sort("startTime");

		res.status(200).json(data);
	} catch (error) {
		res.status(400).send({
			status: "fail",
			message: error.message,
			error: error,
		});
	}
});

router.post("/createclass", async (req, res) => {
	try {
		let m1 = new meet({
			URL: req.body.URL,
			Id: req.body.ID,
			startTime: req.body.startTime,
			class: req.body.class,
			TeacherName: req.body.TeacherName,
			Subject: req.body.Subject,
		});
		const p1 = await m1.save();
		res.status(201).send(p1);
	} catch (error) {
		res.status(400).send({
			status: "fail",
			message: error.message,
			error: error,
		});
	}
});

router.delete("/deleteSession/id/:id", async (req, res) => {
	try {
		const m1 = await meet.findByIdAndRemove(req.params.id);
		if (!m1)
			return res
				.status(404)
				.send("The product with the given ID was not found.");

		res.json({
			staus: "Sucesss",
			message: "Deleted SUccesfully",
			deletedSession: m1,
		}).status(200);
	} catch (error) {
		res.status(400).send({
			status: "fail",
			message: error.message,
			error: error,
		});
	}
});

module.exports = router;
