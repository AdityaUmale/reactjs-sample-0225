import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  details: String,
  date: Date,
  completed: {
    type: Boolean,
    default: false
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaskList',
    required: true
  }
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;