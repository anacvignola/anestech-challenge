import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 960px;
  margin: 50px auto;
  padding: 0 30px;

  h1 {
    color: #fff;
  }
  @media (max-width: 768px) {
    margin: 30px auto;
  }
  form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    input,
    textarea,
    select {
      background: #fff;
      width: 100%;
      border: 0;
      border-radius: 4px;
      height: 48px;
      padding: 0 15px;
      color: #515366;
      margin: 0 0 10px;
      transition: box-shadow 0.2s;
      &:focus {
        box-shadow: 0 0 3px rgba(93, 97, 164, 0.35);
      }
      &::placeholder {
        color: #999;
      }
    }
    textarea {
      resize: none;
      height: 200px;
      padding: 15px;
    }
    span {
      display: block;
      color: #e74c3c;
      margin: -5px 0 10px;
      font-weight: bold;
      text-align: left;
    }
    button {
      width: 100%;
      height: 48px;
      margin: 10px 0 0;
      text-align: center;
      background: #55efc4;
      font-weight: bold;
      letter-spacing: 0.5px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 10px 14px;
      font-size: 16px;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      &:hover {
        background: ${darken(0.045, '#55efc4')};
      }
      &:disabled {
        opacity: 0.7;
        cursor: wait;
      }
    }
  }
`;
