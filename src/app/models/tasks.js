import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:{type:String,required:true},
    description:String,
    dueDate:Date,
    priority:{type:String,enum:["Low", "Medium", "High"],default:'Medium'},
    status:{type:String,enum:["To-DO", "In Progress", "Done"],default:'To-DO'},
},{
    timestamps:true
})

const Tasks = mongoose.models.Tasks || mongoose.model('Tasks',TaskSchema)

export default Tasks