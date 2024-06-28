import React, { useCallback, useEffect, useState } from "react";
import { apiUpdateProduct, apiDetailproduct } from "../../apis/product";
import { useForm } from "react-hook-form";
import { InputForms, SeclecForm, Button, MackDown } from "../../component";
import { useSelector } from "react-redux";
import { validate, getBase64 } from "../../ultils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { statusproduct } from "../../ultils/contants";

import path from "../../ultils/path";
import { toast } from "react-toastify";
const UpdateProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { category } = useSelector((state) => state.app);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();
  // getdetailt
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiDetailproduct(slug);
        setProduct(response.data);
      } catch (error) {
        console.error("Lỗi", error);
      }
    };
    fetchProduct();
  }, [slug]);
  //

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

  useEffect(() => {
    reset({
      name: product?.name || "",
      price: product?.price || "",
      quantity: product?.quantity || "",
      category: product?.category?._id || "",
      status: product?.status || "",
    });
    setPayload({
      description:
        typeof product?.description === "object"
          ? product?.description?.join(",")
          : product?.description,
    });
    setPreview({
      thumb: product?.thumb || "",
      images: product?.images || [],
    });
  }, [product]);
  console.log("checkproduct", product);
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };
  const handlePreviewImages = async (files) => {
    if (!files) {
      console.error("Files is undefined or null");
      return;
    }
    files = Array.isArray(files) ? files : Array.from(files);
    const imagesPreview = [];
    for (let file of files) {
      const base64 = await getBase64(file);
      imagesPreview.push(base64);
    }
    if (imagesPreview.length > 0)
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  // preview thumb
  useEffect(() => {
    if (watch("thumb")) handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);
  // preview images
  useEffect(() => {
    handlePreviewImages(watch("images"));
  }, [watch("images")]);
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });

  const handleUpdateProduct = async (data) => {
    const invalids = validate(payload, setInvalid);
    if (invalids === 0) {
      const finalPayload = { ...data, ...payload };

      if (data.thumb && data.thumb.length > 0) {
        finalPayload.thumb = data.thumb[0];
      } else {
        finalPayload.thumb = preview.thumb;
      }

      if (data.images && data.images.length > 0) {
        finalPayload.images = Array.from(data.images);
      } else {
        finalPayload.images = preview.images;
      }

      const formData = new FormData();

      for (let [key, value] of Object.entries(finalPayload)) {
        if (key !== "images") {
          formData.append(key, value);
        }
      }

      finalPayload.images.forEach((image) => {
        formData.append("images", image);
      });
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await apiUpdateProduct(slug, formData);
      if (response.status === true) {
        toast.success(response.message);
      }

      navigate(`/${path.HOMEMEMBER}`);
    }
  };

  return (
    <div className=" p-4 bg-white">
      <h1 className=" h-[75px]  flex justify-between font-main items-center text-3xl font-bold px-4 border-b">
        Cập nhật sản phẩm
      </h1>
      <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
          <SeclecForm
            label="Trạng thái "
            register={register}
            id="status"
            style="flex-auto"
            options={statusproduct?.map((el) => ({
              code: el.id,
              value: el.value,
            }))}
            errors={errors}
            value={product?.status}
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
            value={payload?.description}
          />
        </div>
        <div className=" flex flex-col gap-2 my-8 ">
          <label htmlFor="thumb">Thêm hình ảnh chính </label>
          <input type="file" id="thumb" {...register("thumb")} />
          {errors["thumb"] && (
            <small className="text-xs text-red-500 w-auto">
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
          <input type="file" id="products" multiple {...register("images")} />
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
                  src={el}
                  alt=""
                  className="w-[200px] object-contain"
                />
              </div>
            ))}
          </div>
        )}
        <div className="mt-8">
          <Button type="submit" name="Cập nhật sản phẩm" />
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
