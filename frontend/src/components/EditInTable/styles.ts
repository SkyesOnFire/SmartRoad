import { Form } from '@unform/web';
import styled from 'styled-components';

export const UnForm = styled(Form)`
  width: 100% !important;
  min-height: 40px !important;
  padding: 5px !important;
  display: grid !important;
  grid-auto-flow: column !important;
  justify-content: center !important;
  align-content: center !important;
  align-items: center !important;

  .inputHolder,
  .selectHolder {
    padding: 0 16px;
    * {
      font-size: 15px;
    }
    *::placeholder {
      font-size: 15px;
    }
    button {
      overflow: visible !important;
    }
  }
`;
