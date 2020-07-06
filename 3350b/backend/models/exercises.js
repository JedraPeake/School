var mongoose = require('mongoose');
var exercisesSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        objectives: String,
        authorName: String,
        authorSteps: String,
        location: String,
        frequency: Number,
        duration: Number,
        reps: Number,
        target: Date,
        multimediaURL: String,
        images: [{type: mongoose.Schema.ObjectId, ref: ('Images')}],
        rehabilitations: {type: mongoose.Schema.ObjectId, ref: ('rehabilitations')}

    }
);
var Exercises = mongoose.model('exercise', exercisesSchema);
exports.Model = Exercises;