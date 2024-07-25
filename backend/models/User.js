const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},

		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["Admin", "Student", "Instructor"],
			required: true,
		},
		profileDetails: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Profile",
		},
		courses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		],
		courseProgress: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "courseProgress",
			},
		],
		TestSeries: [
			{
				 type: mongoose.Schema.Types.ObjectId, ref: 'TestSeries' 
			}
		], // for instructors



	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
