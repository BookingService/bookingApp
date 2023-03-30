import { colors } from "../../../../shared/colors";
import { Text } from "@mantine/core";
import React, { Dispatch, FC, SetStateAction } from "react";
import { text } from "../../../../shared/constant";

interface IHeaderProps {
  isRegistration: boolean;
  setIsRegistration: Dispatch<SetStateAction<boolean>>;
}

export const LoginHeader: FC<IHeaderProps> = ({
  isRegistration,
  setIsRegistration,
}) => {
  const signInOrRegistrationHandler = () => {
    setIsRegistration(!isRegistration);
  };
  return (
    <header className="flex justify-between mb-4">
      <Text size="lg" color={colors.primary}>
        FlaatsRent
      </Text>
      <Text
        onClick={signInOrRegistrationHandler}
        className="cursor-pointer"
        color="gray"
      >
        {isRegistration ? text.signin_message : text.registration_message}
      </Text>
    </header>
  );
};
