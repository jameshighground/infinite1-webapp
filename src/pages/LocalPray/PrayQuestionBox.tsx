import React, { FC } from "react";
import GoogleLogin from "react-google-login";
import Column from "../../components/Column";
import { useAuthContext } from "../../InfiniteContext";
import { PrayQuestionBoxContainer } from "./localPrayStyle";

type Props = {
  okTempHandler: () => void;
  cancelTemp: () => void;
  isChain?: boolean;
};

const clientId =
  "1076100753398-65qgajcbv8mfg22hdba71bsjem77tmev.apps.googleusercontent.com";

const PrayQuestionBox: FC<Props> = ({ okTempHandler, cancelTemp, isChain }) => {
  const email = localStorage.getItem("email");
  const { setMyEmail } = useAuthContext();

  const onSuccess = async (response: any) => {
    const {
      profileObj: { email },
    } = response;

    localStorage.setItem("email", email);
    setMyEmail(email);
    okTempHandler();
  };

  const onFailure = (error: any) => {
    console.log(error);
  };

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
          <GoogleLogin
            clientId={clientId}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            buttonText="Google Login"
            render={(renderProps) => (
              <button
                onClick={() => {
                  renderProps.onClick();
                }}
              >
                Yes
              </button>
            )}
          />
        ) : (
          <>
            <button onClick={okTempHandler}>Yes</button>
          </>
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
