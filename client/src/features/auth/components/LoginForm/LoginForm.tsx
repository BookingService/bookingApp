import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { Button, Paper, TextInput, Title, PasswordInput } from "@mantine/core";
import { useAuth } from "../../hooks/useAuth";

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
          Login
        </Title>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col items-center"
        >
          <div className="w-7/12 flex flex-col">
            <TextInput
              label="Email"
              required
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email is invalid",
                },
              })}
              error={errors.email?.message}
              withAsterisk
              mb={"sm"}
            />

            <PasswordInput
              autoComplete="new-password"
              label="Password"
              required
              withAsterisk
              description="Password should include at least 5 symbols"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Minimal lenght of password is 5",
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
              Login
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
};
