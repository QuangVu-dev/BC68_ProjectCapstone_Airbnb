import React from "react";
import FormSignUp from "../../components/FormSignUp/FormSignUp";
import SignupAmination from "../../assets/animation/SignupAnimation.json";
import { useLottie } from "lottie-react";

const SignupPage = () => {
  const options = {
    animationData: SignupAmination,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
    <div className="flex">
      <div className="w-1/2">{View}</div>
      <div className="w-1/2">
        <FormSignUp />
      </div>
    </div>
  );
};

export default SignupPage;
