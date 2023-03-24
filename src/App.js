import React from "react";
import styled from "styled-components";
import MainForm from "./Components/MainForm.jsx";

const App = () => {
  return (
    <PageContainer>
      <MainForm />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: #CDDEE5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default App;