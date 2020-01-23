import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

export default function New() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const optionsStatus = [
    { id: '1', title: 'Pendente' },
    { id: '2', title: 'Em andamento' },
    { id: '3', title: 'Concluído' },
  ];

  useEffect(() => {
    async function loadDropdown() {
      const userList = await api.get('users');
      setUsers(
        userList.data.map(user => {
          return { id: user.id, title: user.name };
        })
      );
    }
    loadDropdown();
  }, []);

  async function handleSubmit(data) {
    setLoading(true);

    try {
      const response = await api.post('task', data);
      toast.success('Tarefa criada com sucesso!');
      history.push(`/tasks/${response.data.id}`);
    } catch (err) {
      const errData = err.response.data;
      toast.error(
        errData && errData.error
          ? `Error creating task: ${errData.error}`
          : 'Error creating task, try again'
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
      <h1>Nova Tarefa</h1>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="title" placeholder="Título..." />
        <Input name="description" placeholder="Descrição..." multiline />
        <Select
          name="responsible_id"
          placeholder="Responsável"
          options={users}
        />
        <Select
          name="status"
          placeholder="Status"
          defaultValue={1}
          options={optionsStatus}
        />
        <button type="submit" disabled={loading}>
          Criar
        </button>
      </Form>
    </Container>
  );
}
