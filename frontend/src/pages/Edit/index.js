import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdSave } from 'react-icons/md';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

export default function Edit({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function loadTask() {
      try {
        const response = await api.get(`tasks/${id}`);
        setTask({
          ...response.data.task,
        });
        setLoading(false);
      } catch (err) {
        toast.error('Task not found.');
        history.push('/');
      }
    }

    loadTask();
  }, [id]);

  async function handleSubmit(data) {
    try {
      setLoading(true);
      await api.put(`tasks/${id}`, data);
      toast.success('Task edited successfully!');
      history.push(`/tasks/${id}`);
    } catch (err) {
      const errData = err.response.data;
      toast.error(
        errData && errData.error
          ? `Error editing task: ${errData.error}`
          : 'Error editing task, try again'
      );
      setLoading(false);
    }
  }

  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <Container>
      {loading ? (
        <div className="loading">
          <Loader type="TailSpin" color="#fff" width={32} height={32} />
        </div>
      ) : (
        <Form schema={schema} initialData={task} onSubmit={handleSubmit}>
          <Input name="title" placeholder="Title" />
          <Input name="description" placeholder="Description" multiline />

          <button type="submit" disabled={loading}>
            <MdSave size={18} color="#fff" />
            Savar
          </button>
        </Form>
      )}
    </Container>
  );
}
