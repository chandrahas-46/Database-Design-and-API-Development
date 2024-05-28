import db from '../../Config/pg.config.js';

export default class TaskController {
    async createTask(req, res) {
        const { title, description, organizationId, userId } = req.body;
        try {
            const newTask = await db.query(
                'INSERT INTO tasks (title, description, organization_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [title, description, organizationId, userId]
            );
            res.status(201).json({ success: true, task: newTask.rows[0] });
        } 
        catch (error) {
            console.error('Error while creating task:', error);
            res.status(500).json({ success: false, message: 'Error while creating task' });
        }
    }

    async getUserTasks(req, res) {
        const { userId } = req.params;
        try {
            const tasks = await db.query(
                `SELECT o.name as organization_name, t.title, t.description 
                FROM tasks t 
                JOIN organizations o ON t.organization_id = o.id 
                WHERE t.user_id = $1`, 
                [userId]
            );
            res.status(200).json({ success: true, tasks: tasks.rows });
        } 
        catch (error) {
            console.error('Error while retrieving tasks:', error);
            res.status(500).json({ success: false, message: 'Error while retrieving tasks' });
        }
    }
}
