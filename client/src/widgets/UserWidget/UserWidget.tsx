import React from "react";
import { Menu, Button } from "@mantine/core";
import { text } from "../../shared/constant";
import { HamburgerIcon } from "../../shared/HamburgerIcon";
import { UserIcon } from "../../shared/Header/UserIcon";
import { useNavigate } from "react-router-dom";
export const UserWidget = () => {
  const navigate = useNavigate();
  const handleClickOnMenuItem = () => {
    navigate("/auth");
  };
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant={"default"}
          color="##F53850"
          leftIcon={<HamburgerIcon />}
          rightIcon={<UserIcon />}
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{text.authenication}</Menu.Label>
        <Menu.Item onClick={handleClickOnMenuItem}>{text.registrate}</Menu.Item>
        <Menu.Item onClick={handleClickOnMenuItem}>{text.login}</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
