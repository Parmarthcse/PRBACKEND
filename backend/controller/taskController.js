export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;  // Use 'title' here to match the schema
        const createdBy = req.user._id;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Please provide both title and description",
            });
        }

        const task = await Task.create({ title, description, createdBy });

        res.status(200).json({
            success: true,
            message: "Task created",
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error, please try again later.",
        });
    }
};
//to get our tasks by our id's
export const getMyTasks = async(res, req, next)=> {
    const tasks = await Task.find({createdBy: req.user._id});
    res.status(200).json({
        success: true,
        tasks,
    })
}
//first we have to verify it by id params id 
export const deleteTask = async(req, res ,next) => {
    const task = await Task.findById(req.paramas.id);
    if(!task){
        return next (
        res.status(404).json({
            success: false,
            message: "Task not found",
            
        })
    )
}
await task.deleteOne();
res.status(200).json({
    success: true,
    message: "Task submitted",
})
}

export const updateTask = async(req, res, next)=> {
    const task = await Task.findById(req.params.id);
    if(!task){
        return next(
            res.status(404).json({
                success: false,
                message: "Task not found"
            })
        )
    }
    const {title, description}= req.body
    task = await Task.findByIdAndUpdate(
        req.params.id,
        {title, description},
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    )
    res.status(200).json({
success: true,
message: "Task Updated!",
task
    })
}
