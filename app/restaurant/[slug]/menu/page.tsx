import React from "react";
import RestaurantNavBar from "../components/RestaurantNavBar";
import MenuCard from "../components/MenuCard";

const RestaurantMenu = () => {
  return (
    <>
        <div className="bg-white w-[100%] rounded p-3 shadow">
          <RestaurantNavBar />
          <MenuCard />
        </div>
    </>
  );
};

export default RestaurantMenu;
