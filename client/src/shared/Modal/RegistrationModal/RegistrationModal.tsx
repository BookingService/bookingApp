import { Button, Modal, PasswordInput, Text, TextInput } from "@mantine/core";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { phoneMask, text } from "../../constant";
import { DateInput } from "@mantine/dates";
import MaskedInput from "react-text-mask";
import { Controller, useForm } from "react-hook-form";
import { TRegistration } from "../../../features/auth/components/RegistrationForm/RegistrationForm";
import { useRegistration } from "../../../features/auth/hooks/useRegistration";

export interface IModalProps {
  title: string;
  onClose: () => void;
  opened: boolean;
  changeModal: Dispatch<SetStateAction<boolean>>;
}
export const RegistrationModal: FC<IModalProps> = ({
  onClose,
  title,
  opened,
  changeModal,
}) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm<TRegistration>({ mode: "onChange" });
  const { mutate } = useRegistration();
  const handleFormSubmit = (values: TRegistration) => {
    mutate(values);
    onClose();
  };
  const age = watch("age");
  const handleChangeModalClick = () => {
    changeModal((prev) => !prev);
  };
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      transitionProps={{ duration: 500, transition: "fade" }}
      withCloseButton={false}
      size="lg"
    >
      <Modal.Header className="flex justify-between">
        <Text className="text-center">{title}</Text>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>
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
            <div className="flex flex-col items-center justify-between">
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
              <Text
                color="grey"
                className="underline cursor-pointer"
                onClick={handleChangeModalClick}
                size="sm"
              >
                {text.signin_message}
              </Text>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
