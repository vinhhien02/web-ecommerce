import React, { useCallback, useEffect, useState } from "react";
import { apiCreateproduct } from "../../apis/product";
import { useForm } from "react-hook-form";
import { InputForms, SeclecForm, Button, MackDown } from "../../component";
import { useSelector } from "react-redux";
import { validate, getBase64 } from "../../ultils/helpers";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import path from "../../ultils/path";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { category } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();
  const [payload, setPayload] = useState({
    description: "",
  });
  const [invalid, setInvalid] = useState([]);
  const onchnageValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };
  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      const base64 = await getBase64(file);
      imagesPreview.push({ name: file.name, path: base64 });
    }
    if (imagesPreview.length > 0)
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  // preview thumb
  useEffect(() => {
    handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);
  // preview images
  useEffect(() => {
    handlePreviewImages(watch("images"));
  }, [watch("images")]);
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });

  const handleCreateproduct = async (data) => {
    const invalids = validate(payload, setInvalid);
    if (invalids === 0) {
      const finalPayload = { ...data, ...payload };

      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.thumb) formData.append("thumb", finalPayload.thumb[0]);
      if (finalPayload.images) {
        for (let image of finalPayload.images) formData.append("images", image);
      }

      const response = await apiCreateproduct(formData);
      if (response) {
        Swal.fire({
          title: response.status === true ? "thành công!" : "thất bại!",
          text: response.message,
          icon: response.status ? "success" : "error",
        });
        navigate(`/${path.HOMEMEMBER}`);
      }
    }
  };

  return (
    <div className=" px-4 bg-white">
      <div class="mb-6 flex flex-col w-full  right-0 gap-3 border-b  sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-title font-bold flex p-4 gap-4 items-center text-2xl">
          Thêm Sản phẩm mới
        </h2>
      </div>
      <form onSubmit={handleSubmit(handleCreateproduct)}>
        <InputForms
          label="Tên sản phẩm "
          register={register}
          errors={errors}
          id="name"
          validate={{ required: "Vui lòng nhập tên sản phẩm" }}
          fullWidth
          placehoder="Tên sản phẩm "
        />
        <div className="w-full flex gap-4 my-6">
          <InputForms
            label="Giá "
            register={register}
            errors={errors}
            id="price"
            validate={{ required: "Vui lòng nhập giá sản phẩm" }}
            style="flex-auto"
            placehoder="giá "
            type="number"
          />
          <InputForms
            label="Số lượng  "
            register={register}
            errors={errors}
            id="quantity"
            style="flex-auto"
            placehoder="nhập số lượng "
            type="number"
          />
        </div>
        <div>
          <SeclecForm
            label="Danh Mục "
            register={register}
            id="category"
            validate={{ required: "Vui lòng chọn danh mục " }}
            style="flex-auto"
            options={category?.map((el) => ({ code: el._id, value: el.name }))}
            errors={errors}
          />
        </div>
        <div>
          <MackDown
            label="Thông tin chi tiết "
            name="description"
            onchnageValue={onchnageValue}
            invalid={invalid}
            setInvalid={setInvalid}
          />
        </div>
        <div className=" flex flex-col gap-2 my-8 ">
          <label htmlFor="thumb">Thêm hình ảnh chính </label>
          <input
            type="file"
            id="thumb"
            {...register("thumb", { required: "Bạn cần nhập hình ảnh" })}
          />
          {errors["thumb"] && (
            <small className="text-xs text-red-500">
              {errors["thumb"]?.message}
            </small>
          )}
        </div>
        {preview.thumb && (
          <div className="my-4">
            <img
              src={preview.thumb}
              alt=""
              className="w-[200px] object-contain"
            />
          </div>
        )}
        <div className=" flex flex-col gap-2 my-8 ">
          <label htmlFor="products">Thêm hình ảnh sản phẩm </label>
          <input
            type="file"
            id="products"
            multiple
            {...register("images", { required: "Bạn cần nhập hình ảnh" })}
          />
          <p className="text-red-500 italic text-[12px]">*** Nhập từ 5 hình trở lên </p>
          {errors["images"] && (
            <small className="text-xs text-red-500">
              {errors["images"]?.message}
            </small>
          )}
        </div>
        {preview.images.length > 0 && (
          <div className="my-4 flex gap-2 w-full flex-wrap">
            {preview.images?.map((el, idx) => (
              <div className="w-fit relative">
                <img
                  key={idx}
                  src={el.path}
                  alt=""
                  className="w-[200px] object-contain"
                />
              </div>
            ))}
          </div>
        )}
        <div className="mt-8">
          <Button type="submit" name="Thêm tin đăng mới" />
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
