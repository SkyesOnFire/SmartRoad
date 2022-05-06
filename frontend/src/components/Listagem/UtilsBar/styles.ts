import styled from 'styled-components';
import { CSVLink } from 'react-csv';
import { Form } from '@unform/web';

export const UtilsBarHolder = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .utilButton {
    width: 40px;
    height: 40px;

    border-radius: 30px;

    margin: 0 10px;

    border: 0;
    background: var(--main-color);
    color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #fff;
    }
  }
`;

export const PaginationHolder = styled.div`
  flex: 1 1;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const OrderByForm = styled(Form)`
  min-width: 300px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin: 0 10px;

  .selectHolder {
    height: 30px;
  }

  .orderButton {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }
`;

export const Page = styled.span`
  width: auto;
  height: 100%;

  margin: 0 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  color: var(--text-color-2);
  font-size: 18px;
  font-weight: 500;
`;

export const PageButton = styled.button`
  width: 100%;
  height: 100%;
`;

PageButton.defaultProps = {
  className: 'utilButton',
};

export const LoadCsv = styled.button`
  width: 80px !important;
  height: 100%;

  span {
    margin-left: 5px;
  }
`;

LoadCsv.defaultProps = {
  className: 'utilButton',
};

export const UtilCSV = styled(CSVLink)`
  width: 100%;
  height: 100%;
`;

UtilCSV.defaultProps = {
  className: 'utilButton',
};

export const IdHolder = styled.div`
  padding: 5px 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  background-color: var(--secundary-color);

  svg {
    margin-right: 3px;
  }

  svg,
  & {
    color: var(--text-color-1);
  }
`;
