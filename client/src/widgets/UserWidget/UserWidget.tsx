import React, { useContext } from "react";
import { Menu, Button } from "@mantine/core";
import { text } from "../../shared/constant";
import { HamburgerIcon } from "../../shared/Icons/HamburgerIcon";
import { UserIcon } from "../../shared/Header/UserIcon";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

export const UserWidget = () => {
  const navigate = useNavigate();
  const handleClickOnMenuItem = () => {
    navigate("/auth");
  };
  const { setToken, isAuth } = useContext(AuthContext);
  const handleLogoutClick = () => {
    setToken(null);
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
        {isAuth ? (
          <>
            <Menu.Label>Profile</Menu.Label>
            <Menu.Item>Go to your profile</Menu.Item>
            <Menu.Item onClick={handleLogoutClick}>Logout</Menu.Item>
          </>
        ) : (
          <>
            <Menu.Label>{text.authenication}</Menu.Label>
            <Menu.Item onClick={handleClickOnMenuItem}>
              {text.registrate}
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
