import React, { FC } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useAuthContext } from "../../InfiniteContext";

const clientId = process.env.GOOGLE_CLIENT_ID!;

type Props = {
  component: React.ReactNode;
  okHandler(): void;
};

const GoogleLoginLoader: FC<Props> = ({ component, okHandler }) => {
  const { myEmail, setMyEmail } = useAuthContext();

  const onSuccess = async (response: any) => {
    const {
      profileObj: { email },
    } = response;

    localStorage.setItem("email", email);
    setMyEmail(email);
    okHandler();
  };

  const onFailure = (error: any) => {
    console.log(error);
  };

  const logOut = () => {
    setMyEmail("");
    localStorage.clear();
  };

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      buttonText="Google Login"
      render={(renderProps) => (
        <div
          onClick={() => {
            renderProps.onClick();
          }}
        >
          {component}
        </div>
      )}
    />
  );
};

export default GoogleLoginLoader;
