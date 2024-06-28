export const validate = (payload, setInvalid) => {
  let invalid = 0;
  const formatPayload = Object.entries(payload);
  formatPayload.forEach(([key, value]) => {
    if (value.trim() === "") {
      invalid++;
      setInvalid((prev) => [
        ...prev,
        { name: key, message: `Không được bỏ trống ${key}` },
      ]);
    }
  });
  formatPayload.forEach(([key, value]) => {
    if (key === "email") {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!value.match(regex)) {
        invalid++;
        setInvalid((prev) => [
          ...prev,
          { name: key, message: "Định dạng email không hợp lệ" },
        ]);
      }
    }
  });

  formatPayload.forEach(([key, value]) => {
    if (key === "password") {
      let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!value.match(regex)) {
        invalid++;
        setInvalid((prev) => [
          ...prev,
          {
            name: key,
            message:
              "Mật khẩu phải dài ít nhất 8 ký tự và bao gồm cả chữ và số",
          },
        ]);
      }
    }
  });
  const password = payload.password;
  const confirmPassword = payload.confirmPassword;
  if (password && confirmPassword && password !== confirmPassword) {
    invalid++;
    setInvalid((prev) => [
      ...prev,
      { name: "confirmPassword", message: "Mật khẩu không trùng khớp" },
    ]);
  }

  return invalid;
};
export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
