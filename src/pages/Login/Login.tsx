import React from "react";
import GoogleButton from "./GoogleButton";

type SubmitType = {
  socialId: string;
  socialType: string;
  email: string;
  nickname: string;
};

const Login = () => {
  const onSubmit = (props: SubmitType) => {
    const { socialId, email, nickname } = props;
    console.log(socialId);
    console.log(email);
    console.log(nickname);
  };
  return <div>{/* <GoogleButton onSubmit={onSubmit} /> */}</div>;
};

export default Login;
