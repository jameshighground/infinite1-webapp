import React, { FC } from "react";
import Column from "../../components/Column";
import { PrayQuestionBoxContainer } from "./localPrayStyle";

const PrayQuestionBox: FC<{ cancelTemp(): void }> = ({ cancelTemp }) => {
  return (
    <PrayQuestionBoxContainer
      style={{
        color: "green",

        transform: "translateX(-50%)",
      }}
      className={"fade-in-top"}
    >
      <span>이 곳을 위해서 기도하시겠어요?</span>
      <Column isRow={true} gap={4}>
        <button>네</button>
        <button
          onClick={() => {
            setTimeout(cancelTemp, 100);
          }}
        >
          아니오
        </button>
      </Column>
    </PrayQuestionBoxContainer>
  );
};

export default PrayQuestionBox;
