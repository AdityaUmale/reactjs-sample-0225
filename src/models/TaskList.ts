import mongoose from 'mongoose';

const taskListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }]
}, { timestamps: true });

const TaskList = mongoose.models.TaskList || mongoose.model('TaskList', taskListSchema);

export default TaskList;