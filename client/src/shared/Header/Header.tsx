import { FC } from "react";

import { UserWidget } from "../../widgets/UserWidget/UserWidget";
import Logo from "../../../public/logo.png";
import { useNavigate } from "react-router-dom";
import { Search } from "./Search";
export const Header: FC = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <header className="flex justify-between w-full border-b-[1px] py-4 px-4">
      <div className="flex items-center justify-center">
        <img
          src={Logo}
          alt="Logo"
          width={100}
          height={100}
          className="cursor-pointer"
          onClick={handleLogoClick}
        />
      </div>
      <div>
        <Search />
      </div>
      <div>
        <UserWidget />
      </div>
    </header>
  );
};
