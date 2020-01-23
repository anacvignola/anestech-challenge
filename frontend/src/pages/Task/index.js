import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { MdEdit, MdDeleteForever, MdDateRange, MdPerson } from 'react-icons/md';
import nl2br from 'react-nl2br';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Details } from './styles';

export default function Task({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function loadTask() {
      try {
        const response = await api.get(`/tasks/${id}`);
        setTask({
          ...response.data.task,
          formattedDate: format(
            parseISO(response.data.task.created_at),
            "dd/MM/Y - HH'h'mm"
          ),
        });

        setLoading(false);
      } catch (err) {
        toast.error('Task not found');
        history.push('/');
      }
    }

    loadTask();
  }, [id]);

  function handleEdit() {
    history.push(`/tasks/${id}/edit`);
  }

  async function handleDelete() {
    try {
      await api.delete(`tasks/${id}`);
      toast.success('Task successfully deleted!');
      history.push('/dashboard');
    } catch (err) {
      toast.error('Error deleted task, try again');
    }
  }

  return (
    <Container>
      {loading ? (
        <div className="loading">
          <Loader type="TailSpin" color="#fff" width={32} height={32} />
        </div>
      ) : (
        <Details>
          <header>
            <h1>{task.title}</h1>

            {!task.past && (
              <nav>
                <button type="button" className="edit" onClick={handleEdit}>
                  <MdEdit size={16} color="#fff" />
                  Editar
                </button>

                <button type="button" className="delete" onClick={handleDelete}>
                  <MdDeleteForever size={20} color="#fff" />
                  Deletar
                </button>
              </nav>
            )}
          </header>

          <main>
            <div className="wrapper">
              <p>{nl2br(task.description)}</p>
              <footer>
                <div className="info">
                  <p>
                    <MdDateRange size={18} color="#fff" />
                    {task.formattedDate}
                  </p>
                  <p>
                    <MdPerson size={18} color="#fff" />
                    {task.responsible.name}
                  </p>
                </div>
              </footer>
            </div>
          </main>
        </Details>
      )}
    </Container>
  );
}

Task.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
