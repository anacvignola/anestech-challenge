import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Content, Profile } from './styles';

import task from '~/assets/images/task-fill-blue.svg';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        <nav>
          <img src={task} alt="Tasks Anestech" />
          <Link to="/dashboard">TASKS ANESTECH</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={
                profile.avatar.url ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Profile"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
