import { Button, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import { ChangeEvent, FC } from "react";
import { Controller, useForm } from "react-hook-form";
import MaskedInput from "react-text-mask";
import { DateInput } from "@mantine/dates";
import { phoneMask } from "../../../../shared/constant";
import { useRegistration } from "../../hooks/useRegistration";

export type TRegistration = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: Date;
  phone: string;
};

export const RegistrationForm: FC = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
  } = useForm<TRegistration>({ mode: "onChange" });

  const { mutate } = useRegistration();
  const handleFormSubmit = (values: TRegistration) => {
    mutate(values);
    reset();
  };
  const age = watch("age");
  return (
    <>
      <Paper
        className="p-4  w-9/12 flex flex-col my-0 mx-auto justify-center"
        shadow="sm"
        withBorder={false}
      >
        <Title className="text-center" fw={"normal"}>
          Registration
        </Title>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col items-center"
        >
          <div className="w-7/12 flex flex-col">
            <div className="flex mt-4">
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
                className="w-1/2"
              />
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <MaskedInput
                    mask={phoneMask}
                    guide={false}
                    {...field}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      field.onChange(e.target.value.replace(/[^\d]/g, ""));
                    }}
                    render={(ref: any, props) => (
                      <TextInput
                        label="Phone"
                        placeholder="+7 (___) ___-__-__"
                        ref={ref}
                        {...props}
                        className="ml-1 w-1/2"
                      />
                    )}
                  />
                )}
              />
            </div>
            <div className="flex">
              <TextInput
                label="First Name"
                required
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                error={errors.firstName?.message}
                withAsterisk
                mb={"sm"}
                className="w-1/2"
              />
              <TextInput
                label="Last Name"
                required
                type="text"
                {...register("lastName", {
                  required: "Last name is required",
                })}
                error={errors.lastName?.message}
                withAsterisk
                mb={"sm"}
                className="w-1/2 ml-1"
              />
            </div>
            <DateInput
              label="Pick your date of birth"
              error={errors.age?.message}
              withAsterisk
              onChange={(value: Date) => setValue("age", value)}
              value={age ?? null}
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
              className=" self-end"
            >
              Registration
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
};
