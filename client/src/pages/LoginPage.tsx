import { LoginForm } from "../features/auth/components/LoginForm/LoginForm";
import { FC, useState } from "react";
import { RegistrationForm } from "../features/auth/components/RegistrationForm/RegistrationForm";

export const LoginPage: FC = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  return (
    <>
      {!isRegistration && <LoginForm setIsRegistration={setIsRegistration} />}
      {isRegistration && <RegistrationForm setIsLogin={setIsRegistration} />}
    </>
  );
};
