import React, { useEffect, useState } from "react";
import { apiGetAllInterested, apiUpdateInterested } from "../apis/product";
import icons from "../ultils/icon";
import { useNavigate } from "react-router-dom";

const Notifi = ({ id }) => {
  const navigate = useNavigate();
  const {  FaFlagCheckered } = icons;
  const [interesteds, setInterested] = useState([]);
  const fetchReports = async (id) => {
    const rs = await apiGetAllInterested(id);
    setInterested(rs.getInterested);
   
  };
  useEffect(() => {
    if (id) {
      fetchReports(id);
    }
  }, [id]);
  const handleClick = async (id) => {
    await apiUpdateInterested(id, { view: true });
    fetchReports(id);
  };
  
  const handleUserClick = (id) => {
    navigate(`/profile/${id}`);
  };
  return (
    <ul class="absolute  mt-[20px] shadow-lg bg-white py-2 px-2  z-[1000] flex flex-col lg:top-14 gap-1  min-w-1/4 w-1/4 rounded   overflow-auto">
      {interesteds &&
        interesteds.map((interested) => (
          <li
            onClick={() => handleClick(interested?._id)}
            key={interested._id}
            className={
              interested?.view === false
                ? "py-2.5 px-4 hover:shadow-md bg-blue-300  text-black text-sm cursor-pointer"
                : "py-2.5 px-4 hover:shadow-md bg-white  text-black text-sm cursor-pointer"
            }
          >
            <div>
              
                <span
                  onClick={() => handleUserClick(interested?.userId?._id)}
                  class="flex items-center gap-2"
                >
                  < FaFlagCheckered size="40px" color="green" />
                  {`${interested?.userId?.userName} đã quan tâm đến tin đăng ${interested?.productId?.name} của bạn `}
                </span>
             
            </div>
          </li>
        ))}
    </ul>
  );
};

export default Notifi;
