import { Button, Modal, PasswordInput, Text, TextInput } from "@mantine/core";
import React, { FC } from "react";
import { IModalProps } from "../RegistrationModal/RegistrationModal";
import { text } from "../../constant";
import { useForm } from "react-hook-form";
import { TLogin } from "../../../features/auth/components/LoginForm/LoginForm";
import { useAuth } from "../../../features/auth/hooks/useAuth";

export const LoginModal: FC<IModalProps> = ({
  onClose,
  opened,
  changeModal,
  title,
}) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TLogin>({ mode: "onChange" });
  const { isLoading, login } = useAuth();
  const handleFormSubmit = (values: TLogin) => {
    login(values);
    onClose();
  };
  const handleChangeModalClick = () => {
    changeModal((prev) => !prev);
  };
  return (
    <Modal onClose={onClose} opened={opened} withCloseButton={false}>
      <Modal.Header className="flex justify-between">
        <Text>{title}</Text>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col items-center"
        >
          <div className="w-7/12 flex flex-col">
            <TextInput
              label={text.email}
              required
              type="email"
              placeholder={text.email_placeholder}
              {...register("email", {
                required: `${text.email_empty_error}`,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: `${text.email_validation_error}`,
                },
              })}
              error={errors.email?.message}
              withAsterisk
              mb={"sm"}
            />

            <PasswordInput
              autoComplete="new-password"
              label={text.password}
              required
              withAsterisk
              description={text.password_description}
              error={errors.password?.message}
              placeholder={text.password_placeholder}
              {...register("password", {
                required: `${text.password_validation_error}`,
                minLength: {
                  value: 5,
                  message: `${text.password_value_error}`,
                },
              })}
              mb="sm"
            />
            <div className="flex flex-col">
              <Button
                variant="outline"
                color="violet"
                size="md"
                disabled={
                  !!errors.email?.message?.length ||
                  !!errors.password?.message?.length
                }
                type="submit"
                className="self-end"
                loading={isLoading}
              >
                {text.login}
              </Button>
              <Text
                color="grey"
                className="underline cursor-pointer"
                onClick={handleChangeModalClick}
                size="sm"
              >
                {text.registration_message}
              </Text>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
