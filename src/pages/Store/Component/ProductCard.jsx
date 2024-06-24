import React from "react";
import { formatNumber, formatNumberVND } from "../../../utils/convertData";

const ProductCard = ({ item, onClick }) => {
  const handleClick = (e) => {
    onClick && onClick(item);
  };

  return (
    <>
      <div
        className="rounded-xl bg-white border hover:border hover:border-[#fb5731] overflow-hidden"
        onClick={handleClick}
      >
        <div className="h-[160px] w-full">
          <img
            className="w-full h-full object-cover"
            src={import.meta.env.VITE_FIELDBOOKING_SERVICE + item.ImageUrl}
          />
        </div>
        <div className="p-2">
          <h2 className="text-base">{item?.ProductName}</h2>
          <h3 className="">{formatNumberVND(item?.Price)}</h3>
          <h3 className="">SL:{formatNumber(item?.Count)}</h3>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
