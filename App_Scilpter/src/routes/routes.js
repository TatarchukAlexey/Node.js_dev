const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const goalController = require('../controllers/goalController');
const taskController =require('../controllers/taskController')
///=================
// POST /Авторизация
router.post('/register', userController.newUser)
// POSt / login
router.post('/login', userController.login)
//GET / logout
router.post('/logout', userController.logout)

///=================GOAL
// POST  goal
router.post("/goals", goalController.createNewGoal);
// Get goal
router.get('/goals', goalController.getAllGoals)
// delete goal
router.delete('/goals', goalController.deleteGoal);
// update goal
router.put('/goals', goalController.updateGoal);
router.get('/goals/:id', goalController.getAllGoalByOwnerId);

///=================TASK
router.post("/task", taskController.addTask)
router.put("/task", taskController.updateTask)


module.exports = router;