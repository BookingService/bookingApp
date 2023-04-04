import { getImageUrl } from "../../shared/getImageUrl";
import React, { FC } from "react";
import { IFlat } from "../../types/flat.types";
import { StarIcon } from "../../shared/StarIcon";
type IPropsFlat = {
  flat: IFlat;
};

const FlatCard: FC<IPropsFlat> = ({ flat }) => {
  const formattedPrice = flat?.pricePerNight?.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
  });
  return (
    flat && (
      <div
        style={{ height: "350px", width: "295px" }}
        className="border-red-300 border mb-5 rounded-md"
      >
        <div className="mb-2">
          <img
            src={`https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2021/05/26144958/RIS_147-1.jpg`}
            className="rounded-md"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <span className="font-bold">{flat.title}</span>
            <div className="flex items-center">
              <StarIcon />
              <span>4</span>
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
    )
  );
};

export default FlatCard;
