const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
    content: String,
    options: [String], // array of options
    correctAnswer: Number, // index of the correct option
    marks: Number
});

const testSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    status: { type: String, enum: ['scheduled', 'live', 'completed'], default: 'scheduled' },
    questions: { type: [questionSchema], required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});



const Test = mongoose.model('Test', testSchema);

module.exports = Test;