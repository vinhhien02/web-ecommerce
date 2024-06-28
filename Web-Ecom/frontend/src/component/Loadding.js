import React, { memo } from "react";
import { HashLoader } from "react-spinners";
const Loadding = () => {
  return (
    <div>
      <HashLoader color="red" />
    </div>
  );
};

export default memo(Loadding);
