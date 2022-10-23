import React, { FC } from "react";
import GoogleLogin from "react-google-login";
import Column from "../../components/Column";
import { useAuthContext } from "../../InfiniteContext";
import { PrayQuestionBoxContainer } from "./localPrayStyle";
import GoogleLoginLoader from "../Login/GoogleLoginLoader";

type Props = {
  okTempHandler: () => void;
  cancelTemp: () => void;
  isChain?: boolean;
};

const PrayQuestionBox: FC<Props> = ({ okTempHandler, cancelTemp, isChain }) => {
  const email = localStorage.getItem("email");
  const { setMyEmail } = useAuthContext();

  return (
    <PrayQuestionBoxContainer
      themeColor={isChain ? "blue" : "green"}
      style={{
        transform: "translateX(-50%)",
      }}
      className={"fade-in-top"}
    >
      <span>
        {isChain
          ? "Would you also like to pray for this place?"
          : "Would you like to pray for this place?"}
      </span>
      <Column isRow={true} gap={4}>
        {!email ? (
          <GoogleLoginLoader
            component={
              <button
                onClick={() => {
                  setTimeout(cancelTemp, 100);
                }}
              >
                yes
              </button>
            }
            okHandler={okTempHandler}
          />
        ) : (
          <button onClick={okTempHandler}>Yes</button>
        )}

        <button
          onClick={() => {
            setTimeout(cancelTemp, 100);
          }}
        >
          No
        </button>
      </Column>
    </PrayQuestionBoxContainer>
  );
};

export default PrayQuestionBox;
