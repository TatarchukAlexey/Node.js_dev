const Goal = require('../models/goalModel');

module.exports.createNewGoal = (req, res) => {
  console.log('body', req.body);
  const newGoal = new Goal(req.body);

  newGoal.save((err, goal) => {
    if (err) console.log(err);
    res.json(goal);
  });
};

module.exports.deleteGoal = async (req, res) => {
  try {
    const goalToDelete = await Goal.findByIdAndDelete(req.body.goalId);
    res.send(goalToDelete);
  } catch (e) {
    res.send(e);
  }
};

module.exports.getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.find({});
    res.send(goals);
  } catch (e) {
    res.status(500).send(e)
  }
};

module.exports.updateGoal = async (req, res) => {
  const goalId = req.body.goalId;
  const newTask = req.body.task;

  try {

      const updatedGoal = await Goal.findByIdAndUpdate(
          goalId, 
          { $push: {goalTasks: newTask} }, 
          {new: true}
      );
      res.status(202).json({success: true, updatedGoal});

  } catch (err) {

      res.status(400).json({success: false, message: err.message});

  }
}

module.exports.getAllGoalByOwnerId = async (req, res) => {
  // {
  // 	"goalTitle": "aaa",
  // 	"goalDescription": "dfdsf",
  // 	"goalNumber": 5,
  // 	 "goalTasks": [{
  // 	 	"taskTitle": "555",
  // 	 	"taskWeekRange": 1,
  // 	 	"taskStartDate": 999999999999,
  // 	 	"taskFinishDate": 99999999999
  //  	 }],
  // 	"ownerId": "5cb59c9685741a26a86938b5"}
  try {
    const userId =req.body.userId;

    const userGoals = await Goal.find({ownerId:userId});
    if(!userGoals.length)
    res.send(userGoals)
    res.status(200).json({
      success: "successful"
  })
    
  } catch (error) {
    res.status(500).json({
      message: error.message
  })
  }
  
  
};

