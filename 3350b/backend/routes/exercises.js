var express = require('express');
var router = express.Router();
var Exercises = require('../models/exercises');
/*
router.route('/')
    .post(function (request, response) {
        var exercises = new Exercises.Model(request.body.exercises);
        exercises.save(function (error) {
            if (error) response.send(error);
            response.json({exercises: exercises});
        });
    })
    .get(function (request, response) {
        var Post = request.query.post;
        if (!Post) {
            Exercises.Model.find(function (error, exercises) {
                if (error) response.send(error);
                response.json({exercises: exercises});
            });
        } else {
            Exercises.Model.find({"exercises": request.query.exercises}, function (error, exercises) {
                if (error) response.send(error);
                response.json({exercises: exercises});
            });
        }
    });

router.route('/:exercises_name')
    .get(function (request, response) {
        Exercises.Model.findById(request.params.exercises_name, function (error, exercises) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({exercises: exercises});
            }
        });
    })
    .put(function (request, response) {
        Exercises.Model.findById(request.params.exercises_name, function (error, exercises) {
            if (error) {
                response.send(error);
            }
            else {
                exercises.name = request.body.exercises.name;
                exercises.description = request.body.exercises.description; 
                exercises.objectives = request.body.exercises.objectives; 
                exercises.authorName = request.body.exercises.authorName; 
                exercises.authorSteps = request.body.exercises.authorSteps; 
                exercises.location = request.body.exercises.location; 
                exercises.frequency = request.body.exercises.frequency; 
                exercises.duration = request.body.exercises.duration; 
                exercises.target = request.body.exercises.target; 
                exercises.multimediaURL = request.body.exercises.multimediaURL;
                
                exercises.save(function (error) { // save plan
                    if (error) {
                        response.send(error);
                    } else {
                        response.status(201).json({exercises: exercises});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        Exercises.Model.findByIdAndRemove(request.params.exercises_name,
            function (error, deleted) {
                if (!error) {
                    response.json({exercises: deleted});
                }
            }
        );
    });

router.route('/:exercises_authorName')
    .get(function (request, response) {
        Exercises.Model.findById(request.params.exercises_authorName, function (error, exercises) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({exercises: exercises});
            }
        });
    })
    .put(function (request, response) {
        Exercises.Model.findById(request.params.exercises_authorName, function (error, exercises) {
            if (error) {
                response.send(error);
            }
            else {
                exercises.statement = request.body.exercises.statement; // update exercises
                exercises.save(function (error) { // save plan
                    if (error) {
                        response.send(error);
                    } else {
                        response.status(201).json({exercises: exercises});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        Exercises.Model.findByIdAndRemove(request.params.exercises_authorName,
            function (error, deleted) {
                if (!error) {
                    response.json({exercises: deleted});
                }
            }
        );
    });

module.exports = router;
*/
router.route('/')
    /*.post(function (request, response) {
        var exercise = new Exercises.Model(request.body.exercise);
        exercise.save(function (error, rec) {
            if (error) response.send(error);
            response.json({exercise: rec});
        });
    })*/
    .post(function (request, response) {
        //request.body = {}
        // request.body.exercise = undefined
        console.log(request.payload);
        console.log(request.body);
        var exercise = new Exercises.Model(request.body.exercise);
        
        exercise.save(function (error) {
            if (error) response.send(error);
            response.json({exercise: exercise});
        });


    })
    

    .get(function (request, response) {
        Exercises.Model.find(function (error, exercises) {
            if (error) response.send(error);
            response.json({exercise: exercises});
        });
    });
    
router.route('/:exercise_id')
    .get(function (request, response) {
        Exercises.Model.findById(request.params.exercise_id, function (error, exercise) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({exercise: exercise});
            }
        });
    })

    .put(function (request, response) {
        Exercises.Model.findById(request.params.exercise_id, function (error, exercise) {
            if (error) {
                response.send({error: error});
            }
            else {
                exercise.name = request.body.exercise.name;
                exercise.description = request.body.exercise.description; 
                exercise.objectives = request.body.exercise.objectives; 
                exercise.authorName = request.body.exercise.authorName; 
                exercise.authorSteps = request.body.exercise.authorSteps; 
                exercise.location = request.body.exercise.location; 
                exercise.frequency = request.body.exercise.frequency; 
                exercise.duration = request.body.exercise.duration; 
                exercise.reps = request.body.exercise.reps;
                exercise.target = request.body.exercise.target; 
                exercise.multimediaURL = request.body.exercise.multimediaURL;

                exercise.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({exercise: exercise});
                    }
                });
            }
        });
    })
    
    .patch(function (request, response) {
        Exercises.Model.findById(request.params.exercise_id, function (error, exercise) {
            if (error) {
                response.send({error: error});
            }
            else {
                exercise.name = request.body.exercise.name;
                exercise.description = request.body.exercise.description; 
                exercise.objectives = request.body.exercise.objectives; 
                exercise.authorName = request.body.exercise.authorName; 
                exercise.authorSteps = request.body.exercise.authorSteps; 
                exercise.location = request.body.exercise.location; 
                exercise.frequency = request.body.exercise.frequency; 
                exercise.duration = request.body.exercise.duration; 
                exercise.reps = request.body.exercise.reps;
                exercise.target = request.body.exercise.target; 
                exercise.multimediaURL = request.body.exercise.multimediaURL;

                exercise.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({exercise: exercise});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Exercises.Model.findByIdAndRemove(request.params.exercise_id,
            function (error, deleted) {
                if (!error) {
                    response.json({exercise: deleted});
                }
            }
        );
    });

module.exports = router;
