import React, { FC } from "react";
import styled from "styled-components";
import { Google } from "@mui/icons-material";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 8px;

  padding: 8px 16px;

  border: 2px solid #c9c9c9;
  border-radius: 16px;
  width: 80vw;
  max-width: 460px;
`;

const GoogleLoginButton: FC<{ onClick(): void }> = ({ onClick }) => {
  return (
    <ButtonContainer onClick={onClick}>
      <Google />
      <span>Login</span>
    </ButtonContainer>
  );
};

export default GoogleLoginButton;
