import styled, { keyframes } from 'styled-components';
import LoginBg from 'assets/fundoLoginBg2.jpg';
import LoginBgHD from 'assets/fundoLoginBg2-fullhd.jpg';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  background: url(${LoginBgHD});
  background-repeat: no-repeat;
  background-size: cover;

  form {
    width: 35%;
    height: 80%;
  }

  @media (max-width: 1366px) {
    background-image: url(${LoginBg});

    form {
      width: 45%;
      height: 90%;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    min-height: -webkit-fill-available;

    form {
      width: 90%;
      height: 90%;
    }
  }
`;

const formAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const AnimatedForm = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 50px 70px;

  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  animation: ${formAnimation} 1s;
  button {
    height: 60px;
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    padding: 20px 25px;
  }
`;

export const FormHeader = styled.div`
  height: 25%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  overflow: visible !important;

  img {
    width: 40%;
  }

  h1 {
    margin: 0px;
    font-weight: 600;
    color: var(--quaternary-color);
    overflow: visible !important;
  }

  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;

    img {
      width: 70%;
    }
  }
`;

export const FormBody = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: visible;

  label {
    color: var(--text-color-2);
    font-size: 1.4rem;
    margin-bottom: 2%;
    width: 100%;
    text-align: left;
  }
  .inputHolder {
    height: 50px;
    border-radius: 10px;
  }

  .inputHolder:first-of-type {
    margin-bottom: 20px;
  }

  a {
    color: var(--text-color-3);
    font-size: 1.2rem;
    font-weight: 400;
    margin-top: 10px;
  }
`;

export const FormFooter = styled.div`
  height: 15%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
