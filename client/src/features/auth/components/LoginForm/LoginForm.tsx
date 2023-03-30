import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { Button, Paper, TextInput, Title, PasswordInput } from "@mantine/core";
import { useAuth } from "../../hooks/useAuth";
import { text } from "../../../../shared/constant";

export type TLogin = {
  email: string;
  password: string;
};

export const LoginForm: FC = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TLogin>({ mode: "onChange" });
  const { isLoading, login } = useAuth();
  const handleFormSubmit = (values: TLogin) => {
    login(values);
  };
  return (
    <>
      <Paper
        className="p-4 h-96 w-9/12 flex flex-col my-0 mx-auto justify-center"
        shadow="sm"
        withBorder={false}
      >
        <Title className="text-center" fw={"normal"}>
          {text.login}
        </Title>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col items-center"
        >
          <div className="w-7/12 flex flex-col">
            <TextInput
              label={text.email}
              required
              type="email"
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
              {...register("password", {
                required: `${text.password_validation_error}`,
                minLength: {
                  value: 5,
                  message: `${text.password_value_error}`,
                },
              })}
              mb="sm"
            />
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
          </div>
        </form>
      </Paper>
    </>
  );
};
