import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HeaderHolder = styled.div`
  height: 60px;
  width: 100%;
  padding-left: var(--layout-items-size);

  position: absolute;
  top: var(--layout-items-size);
  left: 0;

  color: var(--text-color-1);
  background: rgb(51, 51, 51);
  background: linear-gradient(
    180deg,
    rgba(51, 51, 51, 1) 90%,
    rgba(0, 0, 0, 0) 100%
  );

  display: grid;
  grid-template-columns: 1.3fr 3.5fr 3.5fr 3fr 2fr 2fr 3fr;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;

  @media (max-width: 768px) {
    top: var(--layout-mobile-items-size);
    left: 0px;
    width: 100%;
    height: auto;
    padding: 5px 0 10px;
    grid-template-columns: 1fr 1fr !important;
    grid-template-areas:
      'mid1 mid2'
      'mid3 mid4'
      'mid5 mid6'
      'full full';
  }
`;

export const HeaderItem = styled.div`
  width: auto;
  height: 30px;

  padding: 5px 0;

  border-right: 1px solid #ccc;

  &:last-of-type {
    border-right: 0px;
  }

  background: transparent;

  flex: 1 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    svg {
      margin-right: 5px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 5px 0;
    &:nth-child(2n) {
      border-right: 0px;
    }

    &.mid1 {
      grid-area: mid1;
    }

    &.mid2 {
      grid-area: mid2;
    }

    &.mid3 {
      grid-area: mid3;
    }

    &.mid4 {
      grid-area: mid4;
    }

    &.mid5 {
      grid-area: mid5;
    }

    &.mid6 {
      grid-area: mid6;
    }

    &.full {
      grid-area: full;
    }
  }
`;

export const BodyHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  height: auto;

  overflow: visible !important;

  @media (max-width: 768px) {
    margin-top: 200px;
    flex-direction: column;
  }
`;

export const ModalOpener = styled.span`
  padding: 8px 30px;

  background-color: var(--secundary-color);
  border-radius: 30px;
  box-shadow: 0 0 4px var(--shadow-color);

  transition: 0.3s all;

  &:hover {
    padding: 8px 40px;
  }
`;
