import React, { useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

// const clientId = "792430201676-gf9s754qrgp7s6krbm1diq7adf0duu5a.apps.googleusercontent.com";
const clientId =
  "1076100753398-65qgajcbv8mfg22hdba71bsjem77tmev.apps.googleusercontent.com";

type Props = {
  onSubmit: Function;
};

const GoogleButton = (props: Props) => {
  const { onSubmit } = props;

  const [profile, setProfile] = useState<string | null>(
    localStorage.getItem("email")
  );

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
    setProfile(email);
  };

  const onFailure = (error: any) => {
    console.log(error);
  };

  const logOut = () => {
    setProfile(null);
    localStorage.clear();
  };

  return (
    <div>
      {profile ? (
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
