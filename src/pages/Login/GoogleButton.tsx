import React from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useAuthContext } from "../../InfiniteContext";

const clientId =
  "792430201676-gf9s754qrgp7s6krbm1diq7adf0duu5a.apps.googleusercontent.com";

type Props = {
  onSubmit: Function;
};

const GoogleButton = (props: Props) => {
  const { onSubmit } = props;

  const { myEmail, setMyEmail } = useAuthContext();

  const onSuccess = async (response: any) => {
    const {
      googleId,
      profileObj: { email, name },
    } = response;

    await onSubmit({
      socialId: googleId,
      socialType: "google",
      email,
      nickname: name,
    });

    localStorage.setItem("email", email);
    setMyEmail(email);
  };

  const onFailure = (error: any) => {
    console.log(error);
  };

  const logOut = () => {
    setMyEmail("");
    localStorage.clear();
  };

  return (
    <div>
      {myEmail ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={logOut}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={clientId}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          buttonText="Google Login"
        />
      )}
    </div>
  );
};

export default GoogleButton;
