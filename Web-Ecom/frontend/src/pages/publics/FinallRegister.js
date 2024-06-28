import React,{useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import Swal from "sweetalert2";
 
const FinallRegister = () => {
  const { status } = useParams()
  const navigate =useNavigate()
useEffect(()=>{
  if(status==='false'){
     Swal.fire({
        title:  "Lỗi!",
        text: 'Đăng kí không thành công',
        icon: "error",
      }).then(()=>{
navigate(`/${path.LOGIN}`)
      })
  }
   if(status==='true'){
     Swal.fire({
        title:  "Thành công!",
        text: 'Đăng kí thành công',
        icon: "success",
      }).then(()=>{
navigate(`/${path.LOGIN}`)
      })
  }
},[])
  return (
   

<div className="h-screen w-screen"></div>
   
    )
};

export default FinallRegister;
