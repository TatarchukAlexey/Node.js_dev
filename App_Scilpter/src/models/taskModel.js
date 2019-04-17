const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//шаблон создания таски юзера
const TaskSchema = new Schema({
  taskTitle: {
    type: String,
    required: true
  },
  taskWeekRange: {
    type: Number,
    required: true
  },
  taskStartDate: {
    type: Date
  },
  taskFinishDate: {
    type: Date
  },
  isTaskActive: {
    type: Boolean,
    default: false
  },
  isTaskPriority: {
    type: Boolean,
    default: false
  }
});

module.exports = TaskSchema;