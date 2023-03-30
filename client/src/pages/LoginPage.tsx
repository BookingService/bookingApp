import { LoginHeader } from "../features/auth/components/LoginHeader/LoginHeader";
import { LoginForm } from "../features/auth/components/LoginForm/LoginForm";
import { FC, useState } from "react";
import { RegistrationForm } from "../features/auth/components/RegistrationForm/RegistrationForm";

const LoginPage: FC = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  return (
    <>
      <LoginHeader
        isRegistration={isRegistration}
        setIsRegistration={setIsRegistration}
      />
      {!isRegistration && <LoginForm />}
      {isRegistration && <RegistrationForm />}
    </>
  );
};

export default LoginPage;
