import styled from "styled-components";

const mainColor = "#50b19a";
const mainFont = "Montserrat, sans-serif";

export const H1 = styled.h1`
  text-align: left;
  font-family: "Montserrat", sans-serif;
  font-size: 3rem;
  margin-bottom: 0;
`;

export const MessageBlock = styled.span`
  font-family: ${mainFont};
  font-size: 2rem;
  color: ${mainColor};
`;

export const FormBlock = styled.div`
  text-align: left;

  label {
    display: block;
    height: 27px;
    font-weight: bold;
    font-size: 1.1rem;
  }

  .errorMessage {
    color: #c50a0a;
    padding: 2px;
    font-size: 0.8rem;
    height: 24px;
  }

  .hidden {
    visibility: hidden !important;
  }

  input,
  select,
  button {
    width: 100%;
    height: 40px;
    padding: 10px;
    border-style: ridge;
    border-color: darkgrey;
    border-width: 1px;

    &:focus {
      outline: ${mainColor};
      border-color: ${mainColor};
    }

    &:hover {
      cursor: pointer;
    }
  }

  button {
    background: ${mainColor};
    border-color: ${mainColor};
    padding: 0 5px;
    color: #fff;
    font-weight: bold;
    font-size: .9rem;
    text-transform: uppercase;
  }
`;

export const GridTable = styled.table`
  display: grid;
  border-collapse: collapse;
  min-width: 100%;
  overflow: auto;
  grid-template-columns:
    minmax(150px, 3.33fr)
    minmax(150px, 3.33fr)
    minmax(150px, 2fr)
    minmax(150px, 2fr)
    minmax(150px, 2fr);

  thead,
  tbody,
  tr {
    display: contents;
  }

  th,
  td {
    padding: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  th {
    position: sticky;
    top: 0;
    border-bottom: 3px solid ${mainColor};
    font-size: 1.1rem;
    color: ${mainColor};
    font-weight: bold;
    background: #fff;
  }

  td {
    padding-top: 10px;
    padding-bottom: 10px;
    color: #808080;

    &:hover {
      font-weight: bold;
    }

    &:last-of-type {
      font-weight: bold;
    }
  }

  tr:nth-child(even) td {
    background: #f1f1f1;
  }
`;

export const ConversionResultBlock = styled.div`
  color: ${mainColor};
  font-size: 3rem;
  font-weight: bold;
  font-family: Montserrat, sans-serif;
  
  .currency {
    color: #bcbcbc;
  }
`;

export const RateDateBlock = styled.span`
  color: ${mainColor};
`;
