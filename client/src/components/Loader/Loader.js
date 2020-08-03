import React from 'react'
import ReactLoading from 'react-loading';
import styled from 'styled-components';

export default function Loader() {
  return (
    <LoaderWrapper>
      <ReactLoading color="#008000" type="spin" width={100} height={100} delay={100} />
    </LoaderWrapper>
  )
}

const LoaderWrapper = styled.div`
    margin: calc(50% - 70px) auto;
    display: flex;
    justify-content: center;
`;
