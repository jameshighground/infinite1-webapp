import React, { CSSProperties, FC, ReactNode } from "react";
import styled from "styled-components";

const ColumnContainer = styled.div<{ gap?: number; isRow?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isRow ? "row" : " column")};

  gap: ${(props) => (props.gap ? props.gap + "px" : "unset")};
`;

const Column: FC<{
  gap?: number;
  children?: ReactNode;
  style?: CSSProperties;
  isRow?: boolean;
}> = ({ gap, children, style, isRow }) => {
  return (
    <ColumnContainer gap={gap} style={style} isRow={isRow}>
      {children}
    </ColumnContainer>
  );
};

export default Column;
