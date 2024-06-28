import React, { useState } from "react";
import { useSelector } from "react-redux";
import { navigation } from "../ultils/contants";
import { NavLink } from "react-router-dom";
import icons from "../ultils/icon";

const Navigation = () => {
  const { category } = useSelector((state) => state.app);
  const { BsChevronDown } = icons;
  const [isOpenCategory, setIsCategory] = useState(false);

  const toggleDropdownCategory = () => {
    setIsCategory(!isOpenCategory);
  };

  return (
    <div className="w-full flex justify-center py-3 bg-white border-b text-sm">
      <div className="pr-8">
        {navigation.map((el) => (
          <NavLink
            to={el.path}
            key={el.id}
            className={({ isActive }) =>
              isActive
                ? "pr-8 hover:text-main text-main"
                : "pr-8 hover:text-main"
            }
          >
            {el.value}
          </NavLink>
        ))}
      </div>
      <div className=" relative " onClick={toggleDropdownCategory}>
        <div className="hover:text-main flex items-center cursor-pointer">
          Danh Mục
          <BsChevronDown />
        </div>

        {isOpenCategory && (
          <div className="absolute h-[300px] z-50 py-2  top-full left-0 mt-2 w-[260px] bg-white shadow-lg rounded  grid grid-cols-2 gap-2 px-4 ">
            {category &&
              category.map((el) => (
                <NavLink
                  key={el.slug}
                  to={`/${el.slug}`}
                  className="hover:text-main h-auto flex items-center"
                >
                  {el.name}
                </NavLink>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
