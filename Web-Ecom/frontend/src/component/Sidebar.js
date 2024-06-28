import React from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";

import { useSelector } from "react-redux";
const Sidebar = () => {
  const { category } = useSelector((state) => state.app);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: category?.length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <div className="mt-3     rounded-sm">
      <div className=" pl-2 font-bold text-xl">Khám phá danh mục</div>
      <div>
        <Slider {...settings}>
          {category &&
            category.map((el) => (
              <NavLink key={el.slug} to={`/${el.slug}`}>
                <div className="pl-6 flex  flex-col gap-2 items-start justify-center rounded-md  py-3 font-main text-sm hover:text-main hover:shadow-lg h-full ">
                  <img src={el.image} alt="" className="size-20 rounded-lg " />
                  <div>{el.name}</div>
                </div>
              </NavLink>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Sidebar;
