import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { MdAdd, MdAccountCircle, MdEventNote } from 'react-icons/md';

import api from '~/services/api';

import { Container, TasksList, Task } from './styles';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const response = await api.get('tasks');

      const data = response.data.map(task => {
        return {
          ...task,
        };
      });

      setTasks(data);
      setLoading(false);
    }

    loadTasks();
  }, []);

  return (
    <Container>
      {!loading && (
        <header>
          <h1>Tasks</h1>
          <Link to="tasks/new">
            <MdAdd color="#3b9eff" size={22} />
            New Task
          </Link>
        </header>
      )}

      <TasksList>
        {loading && (
          <div className="loading">
            <Loader type="TailSpin" color="#fff" width={32} height={32} />
          </div>
        )}

        {!loading && !tasks.length && (
          <div className="empty">You dont have any tasks yet.</div>
        )}

        {!loading &&
          tasks.map(task => (
            <Task
              to={`/tasks/${task.id}`}
              key={task.id}
              past={task.past ? 1 : 0}
            >
              <p>{task.title}</p>
              <aside>
                <p>
                  <MdAccountCircle color="#3b9eff" size={22} />
                  {task.reposible_id}
                </p>
                <p>
                  <MdEventNote color="#3b9eff" size={22} />
                  {task.created_at}
                </p>
              </aside>
            </Task>
          ))}
      </TasksList>
    </Container>
  );
}
