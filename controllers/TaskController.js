import Task from '../models/Task.js';

export const load = async (request, response) => {
    try {
        const tasks = await Task.find({}).exec();
        
        return response.status(200).json({
            status: "ok",
            message: "Успешно",
            tasks
        });

    } catch (error) {
        console.log('Load tasks error: ', error);
        response.status(500).json({
            status: "error",
            message: "Не удалось получить задания."
        });
    }
}

export const update = async (request, response) => {
    try {
        const obj = request.body;
        const filter = {_id: obj._id};
        const task = await Task.findOne(filter);
        let updatedTask = null;

        if (task) updatedTask = await Task.replaceOne(filter, obj);

        return response.status(200).json({
            status: "ok",
            message: "Успешно",
            task: updatedTask
        });

    } catch (error) {
        console.log('Update task error: ', error);
        response.status(500).json({
            status: "error",
            message: "Не удалось обновить задание."
        });
    }
}

export const create = async (request, response) => {
    try {
        const obj = request.body;
        let task = await Task.findOne({name: obj.name});

        if (!task) task = await Task.create(obj);

        return response.status(200).json({
            status: "ok",
            message: "Успешно",
            task
        });

    } catch (error) {
        console.log('Create task error: ', error);
        response.status(500).json({
            status: "error",
            message: "Не удалось добавить задание."
        });
    }
}

export const remove = async (request, response) => {
    try {
        let deleted = null;
        const ids = request.body._id;

        if (ids.length === 1) {
            const task = await Task.findOne({_id: ids[0]});
            
            if (task) deleted = await Task.deleteOne({_id: ids[0]});
        } else if (ids.length > 1) {
            deleted = await Task.deleteMany({_id: { $in: ids }});
        }
        
        return response.status(200).json({
            status: "ok",
            message: "Успешно",
            deleted
        });

    } catch (error) {
        console.log('Delete task error: ', error);
        response.status(500).json({
            status: "error",
            message: "Не удалось удалить задание."
        });
    }
}