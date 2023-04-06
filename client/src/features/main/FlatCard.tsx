import React, { FC, useContext, useState } from "react";
import { IFlat } from "../../types/flat.types";
import { StarIcon } from "../../shared/Icons/StarIcon";
import { countAverageRating } from "./utils/countAverageRating";
import { HeartIcon } from "../../shared/Icons/HeartIcon";
import { RegistrationModal } from "../../shared/Modal/RegistrationModal/RegistrationModal";
import { LoginModal } from "../../shared/Modal/LoginModal/LoginModal";
import { AuthContext } from "../../context/AuthContext";

type IPropsFlat = {
  flat: IFlat;
};

const FlatCard: FC<IPropsFlat> = ({ flat }) => {
  const formattedPrice = flat?.pricePerNight?.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
  });
  const rating = countAverageRating(flat);
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistrationModal, setIsRegistrationModal] = useState(true);
  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const { isAuth } = useContext(AuthContext);
  return (
    flat && (
      <>
        {isOpen && isRegistrationModal && (
          <RegistrationModal
            opened={isOpen}
            onClose={handleModalClose}
            title="Registration"
            changeModal={setIsRegistrationModal}
          />
        )}
        {isOpen && !isRegistrationModal && (
          <LoginModal
            onClose={handleModalClose}
            opened={isOpen}
            title="Login"
            changeModal={setIsRegistrationModal}
          />
        )}
        <div
          style={{ height: "350px", width: "295px" }}
          className="border-gray-400-300 border mb-5 rounded-md shadow-sm hover:shadow-lg"
        >
          <div className="relative">
            <img
              src={`https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2021/05/26144958/RIS_147-1.jpg`}
              className="rounded-md"
            />
            <div
              className="absolute top-3 right-3 fill-none"
              onClick={isAuth ? undefined : handleModalOpen}
            >
              <HeartIcon />
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between">
              <span className="font-bold">{flat.title}</span>
              <div className="flex items-center">
                <StarIcon />
                <span>{rating}</span>
              </div>
            </div>
            <div>
              <span className="font-thin" color={"gray"}>
                {flat.address}
              </span>
            </div>
            <div>
              {formattedPrice && (
                <>
                  <span className="font-bold">{formattedPrice} </span>
                  <span>за ночь</span>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default FlatCard;
