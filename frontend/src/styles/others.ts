import styled from 'styled-components';

export const ListHolder = styled.div`
  width: 100%;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  div.boxContainer {
    padding: 15px;
  }
`;

ListHolder.defaultProps = {
  className: 'listHolder',
};

export const List = styled.ul`
  width: 100%;
  flex: 1 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  overflow-x: scroll !important;

  list-style: none;
  margin: 0;

  &.break-line {
    li.line {
      height: auto !important;
      button {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-transform: capitalize;

        margin: auto 0;
        div.lineItem {
          overflow: visible;
          height: auto !important;
        }
      }
    }
  }

  @media (max-width: 768px) {
    min-width: 800px;
  }
`;

List.defaultProps = {
  className: 'list',
};

export const Line = styled.li`
  width: 100%;
  min-height: 40px;
  padding: 5px;

  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  background: #fff;

  border-bottom: 1px solid rgb(175 175 175 / 30%);

  transition: 0.3s all;

  &:hover,
  &:focus {
    cursor: pointer;
    opacity: 0.7;
  }

  &:nth-child(2n) {
    background: #fafafa;
  }

  &.indice {
    border-bottom: 1px solid rgb(175 175 175 / 100%);
  }

  @media (max-width: 768px) {
    /* grid-template-columns: 1fr !important; */
  }
`;

Line.defaultProps = {
  className: 'line',
};

export const LineItem = styled.div`
  margin: auto;
  padding: 5px;
  height: 100%;

  color: var(--text-color-2);

  flex: 1;
  min-width: 0;

  align-self: center;

  text-align: center;

  border-right: 1px solid rgb(175 175 175 / 30%);

  &:last-of-type {
    border-right: none;
  }

  &.indice {
    font-weight: 600;
  }

  &#status {
    overflow: visible !important;
  }

  .acao {
    margin: 0 4px;
    &:hover {
      filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.3));
    }
  }

  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  text-transform: capitalize;

  *,
  &,
  button {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize;

    margin: auto 0;
  }

  @media (max-width: 768px) {
    margin: 5px 0;
    border-right: none;
  }
`;

LineItem.defaultProps = {
  className: 'lineItem',
};

export const FilterHolder = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  form {
    width: 100%;
    height: auto;

    display: grid;
    grid-gap: 10px 15px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
  }
`;

export const FilterItemHolder = styled.div`
  height: 70px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  &.submit {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    min-width: auto;
  }

  label {
    height: 40%;
    font-size: 1.2rem;
    margin-bottom: 3px;
  }
  div.selectHolder,
  div.inputHolder,
  button.buttonHolder {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 60%;

    border-radius: 15px;

    border: 0;
    border-bottom: 1px solid var(--quaternary-color);

    font-size: 1.2rem;
    &::placeholder {
      font-size: 1.2rem;
    }

    input,
    select {
      font-size: 1.2rem;
      &::placeholder {
        font-size: 1.2rem;
      }
    }
  }

  button.buttonHolder {
    width: auto;
    padding: 0 15px;
    border: 0;
    margin: 0 10px;

    background-color: var(--main-color);

    svg {
      color: var(--text-color-1);
    }
  }
`;
