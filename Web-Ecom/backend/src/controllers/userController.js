const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const sendMail = require("../ultils/senMail");
const jwtService = require("../services/jwtService");
const crypto = require("crypto");
const Product = require("../models/ProductModel");

// Đăng ký
const createUser = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isEmailValid = reg.test(email);
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isPasswordlValid = regex.test(password);

    if (!userName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Nhập đủ thông tin",
      });
    } else if (!isEmailValid) {
      return res.status(400).json({
        status: false,
        message: "Nhập lại email",
      });
    } else if (!isPasswordlValid) {
      return res.status(400).json({
        status: false,
        message: "Mật khẩu phải ít nhất 8 kí tự bao gồm chữ và số",
      });
    } else if (password !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Mật khẩu không trùng khớp",
      });
    }

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        status: false,
        message: "Email đã tồn tại",
      });
    } else {
      const token = crypto.randomBytes(32).toString("hex");
      res.cookie(
        "dataregister",
        { ...req.body, token },
        { httpOnly: true, maxAge: 15 * 60 * 1000 }
      );

      const html = `Vui lòng click vào đây để xác thực, link này sẽ hết hạn sau 5 phút .
      <a href=${process.env.URL_SERVER}/api/user/finalregister/${token}>click</a>`;
      await sendMail({ email, html, subject: "Hoàn tất đăng kí" });
      return res.status(200).json({
        status: true,
        message:
          "Vui lòng vui lòng kiểm tra lại email của bạn đẻ tiếp tục đăng kí",
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: "Đã có lỗi xảy ra",
    });
  }
};

const finalRegister = async (req, res) => {
  const cookie = req.cookies;
  const { token } = req.params;

  if (!cookie || cookie.dataregister?.token !== token) {
    res.clearCookie("dataregister");

    return res.redirect(`${process.env.CLIENT_URL}/finalregister/false`);
  }
  const hashedPassword = bcrypt.hashSync(cookie.dataregister.password, 10);
  const newUser = await User.create({
    userName: cookie.dataregister.userName,
    email: cookie.dataregister.email,
    password: hashedPassword,
    confirmPassword: hashedPassword,
  });
  res.clearCookie("dataregister");

  if (newUser)
    return res.redirect(`${process.env.CLIENT_URL}/finalregister/true`);
  else return res.redirect(`${process.env.CLIENT_URL}/finalregister/false`);
};

// Đăng nhập
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isEmailValid = reg.test(email);

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Nhập đủ thông tin",
      });
    } else if (!isEmailValid) {
      return res.status(400).json({
        status: false,
        message: "Nhập lại email",
      });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({
        status: false,
        message: "Email không tồn tại",
      });
    }

    const comparePassword = bcrypt.compareSync(password, checkUser.password);
    if (!comparePassword) {
      return res.status(400).json({
        status: false,
        message: "Mật khẩu không chính xác",
      });
    }

    const { role, password: _, ...userData } = checkUser.toObject();
    const accessToken = jwtService.generalAccessToken(checkUser._id, role);
    const refreshToken = jwtService.generalRefreToken(checkUser._id);

    await User.findByIdAndUpdate(
      checkUser._id,
      { refreshToken },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: true,
      message: "Đăng nhập thành công",
      accessToken,
      userData,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: "Đã có lỗi xảy ra với đăng nhập",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Vui lòng nhập Email",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Tài khoản không tồn tại ",
      });
    }
    const resetToken = user.createPasswordChangedToken();
    await user.save();
    const html = `Vui lòng click vào đây để đổi mật khẩu, link này sẽ hết hanj sau 10 phút .
      <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>click</a>`;
    const data = {
      email,
      html,
      subject: "Đặt lại mật khẩu",
    };
    const rs = await sendMail(data);
    return res.status(200).json({
      status: true,
      message: "Vui lòng xác thực email để tiếp tục đổi mật khẩu ",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { password, token, confirmPassword } = req.body;
    if (!password || !token || !confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Vui lòng nhập đầy đủ thông tin ",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Mật khẩu không trùng khớp",
      });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Mã đã hết hạn",
      });
    }

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordChangedAt = Date.now();
    user.passwordResetExpires = undefined;
    await user.save();
    return res.status(200).json({
      status: true,
      message: "Đổi mật khẩu thành công",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Sửa thông tin người dùng

const updateUser = async (req, res) => {
  try {
    const { userName, email, phone, address, gender } = req.body;
    const { _id } = req.user;
    if (!userName) {
      return res.status(400).json({
        status: false,
        message: "nhập đủ thông tin username ",
      });
    }
    if (!email) {
      return res.status(400).json({
        status: false,
        message: "nhập đủ thông tin email ",
      });
    }
    if (!gender) {
      return res.status(400).json({
        status: false,
        message: "nhập đủ thông tin gender",
      });
    }
    if (!address) {
      return res.status(400).json({
        status: false,
        message: "nhập đủ thông tin address ",
      });
    }
    if (!phone) {
      return res.status(400).json({
        status: false,
        message: "nhập đủ thông tin phone ",
      });
    }
    const { role, password, refreshToken, ...updateData } = req.body;
    const user = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
    }).select("-password -role -refreshToken");
    return res.status(200).json({
      status: true,
      message: "Cập nhật thành công",
      user,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: "Đã có lỗi xảy ra",
    });
  }
};
const uploadAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Không có ảnh nào được chọn ",
      });
    }
    const rs = await User.findByIdAndUpdate(
      _id,
      { imageUser: req.file.path },
      { new: true }
    );
    return res.status(200).json({
      status: true,
      message: "Cập nhật ảnh đại diện thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Cập nhật ảnh thất bại ,đã có lỗi xảy ra với hệ thống ",
    });
  }
};
const updateUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;

    if (!role || !status) {
      return res.status(400).json({
        status: false,
        message: "Vui lòng nhập đủ thông tin",
      });
    }

    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy người dùng",
      });
    }
    if (status === "pending") {
      await Product.updateMany({ createdBy: id }, { checkByAdmin: false });
    }
    if (status === "active") {
      await Product.updateMany({ createdBy: id }, { checkByAdmin: true });
    }

    return res.status(200).json({
      status: true,
      message: "Cập nhật thành công",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Đã có lỗi xảy ra",
    });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Tài khoản không tồn tại",
      });
    }

    await User.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      message: "Xóa tài khoản thành công",
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: "Đã có lỗi xảy ra",
    });
  }
};
//  Lấy tất cả người dùng
const getAllUser = async (req, res) => {
  try {
    const { email } = req.query;
    let filter = { role: { $ne: "admin" } };
    if (email) {
      filter.email = { $regex: email, $options: "i" };
    }
    const allUser = await User.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({
      status: true,
      message: "Hiển thị tất cả người dùng thành công",
      data: allUser,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: "Đã có lỗi xảy ra",
    });
  }
};
// Lấy  chi tiết người dùng
const getDetailsUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const detailUser = await User.findById(_id).select(
      "-refreshToken -password "
    );
    if (!detailUser) {
      return res.status(404).json({
        status: false,
        message: "Tài khoản không tồn tại",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Thành công",
      detailUser,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: "Đã có lỗi xảy ra",
    });
  }
};
const getDetailsUserById = async (req, res) => {
  try {
    const { _id } = req.params;
    const detailUser = await User.findById(_id).select(
      "-refreshToken -password -role"
    );
    if (!detailUser) {
      return res.status(404).json({
        status: false,
        message: "Tài khoản không tồn tại",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Thành công",
      detailUser,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: "Đã có lỗi xảy ra",
    });
  }
};
// Tạo  moiws acessToken
const refreshToken = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) {
      return res.status(401).json({
        status: false,
        message: "Không có cookie",
      });
    }
    const decoded = jwt.verify(cookie.refreshToken, process.env.REFRESH_TOKEN);

    const response = await User.findOne({
      _id: decoded._id,
      refreshToken: cookie.refreshToken,
    });
    if (!response) {
      return res.status(403).json({
        status: false,
        message: "Token không hợp lệ",
      });
    }

    const accessToken = jwtService.generalAccessToken(
      response._id,
      response.role
    );
    return res.status(200).json({
      status: true,
      message: "SUCCESS",
      accessToken,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: "Đã có lỗi xảy ra",
    });
  }
};
// Đăng  xuất
const logoutUser = async (req, res) => {
  try {
    const cookie = req.cookies;
    await User.findOneAndUpdate(
      { refreshToken: cookie.refreshToken },
      { refreshToken: "" },
      { new: true }
    );
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json({
      status: true,
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  handleLogin,
  forgotPassword,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  getDetailsUserById,
  refreshToken,
  logoutUser,
  resetPassword,
  uploadAvatar,
  updateUserByAdmin,
  finalRegister,
};
