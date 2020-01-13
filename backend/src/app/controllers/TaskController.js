import * as Yup from 'yup';
import Task from '../models/Task';
import User from '../models/User';
import File from '../models/File';

class TaskController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      responsible_id: Yup.number(),
      status: Yup.number(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { title, description, responsible_id } = req.body;

    const task = await Task.create({
      user_id: req.userId,
      responsible_id,
      title,
      description,
      status: 1,
    });

    return res.json(task);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const tasks = await Task.findAll({
      order: ['created_at'],
      attributes: [
        'id',
        'user_id',
        'created_at',
        'title',
        'description',
        'status',
        'start_date',
        'end_date',
      ],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'responsible',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'url', 'path'],
            },
          ],
        },
      ],
    });
    return res.json(tasks);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      responsible_id: Yup.number(),
      status: Yup.number(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(400).json({ error: 'Task not found' });
    }

    if (task.user_id !== req.userId) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    await task.update(req.body);
    return res.json(task);
  }

  async delete(req, res) {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(400).json({ error: 'Task not found' });
    }

    if (task.user_id !== req.userId) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    await task.destroy();
    return res.send();
  }
}

export default new TaskController();
