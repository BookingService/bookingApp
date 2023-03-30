import { Button, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import { ChangeEvent, FC } from "react";
import { Controller, useForm } from "react-hook-form";
import MaskedInput from "react-text-mask";
import { DateInput } from "@mantine/dates";
import { phoneMask, text } from "../../../../shared/constant";
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
        className="p-4 w-9/12 flex flex-col my-0 mx-auto justify-center"
        shadow="sm"
        withBorder={false}
      >
        <Title className="text-center" fw={"normal"}>
          {text.registration}
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
                        label={text.phone}
                        placeholder={text.phone_placeholder}
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
                label={text.firstname}
                required
                type="text"
                {...register("firstName", {
                  required: `${text.firstname_empty_error}`,
                })}
                error={errors.firstName?.message}
                withAsterisk
                mb={"sm"}
                className="w-1/2"
                placeholder={text.firstname_placeholder}
              />
              <TextInput
                label={text.lastname}
                required
                type="text"
                {...register("lastName", {
                  required: `${text.lastname_empty_error}`,
                })}
                error={errors.lastName?.message}
                withAsterisk
                placeholder={text.lastname_placeholder}
                mb={"sm"}
                className="w-1/2 ml-1"
              />
            </div>
            <DateInput
              label={text.birth_date}
              error={errors.age?.message}
              withAsterisk
              onChange={(value: Date) => setValue("age", value)}
              value={age ?? null}
              placeholder={text.birthdate_placeholder}
            />
            <PasswordInput
              autoComplete="new-password"
              label={text.password}
              required
              withAsterisk
              placeholder={text.password_placeholder}
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
              className=" self-end"
            >
              {text.registration}
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
};
