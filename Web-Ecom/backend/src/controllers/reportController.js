const Report = require("../models/ReportModel");
const Interested = require("../models/InterestedModel");

const createrReport = async (req, res) => {
  try {
    const { reason, productId } = req.body;

    const userId = req.user._id;

    if (productId && !reason) {
      return res.status(400).json({
        status: false,
        message: "Bạn chưa chọn lí do tố cáo bài đăng này",
      });
    }
    if (!productId && !reason) {
      return res.status(400).json({
        status: false,
        message: "Bạn chưa nhập nội dung cần hỗ trợ ",
      });
    }

    if (productId) {
      const checkReport = await Report.findOne({ productId, userId });
      if (checkReport) {
        return res.status(400).json({
          status: false,
          message: "Bạn đã báo cáo sản phẩm này rồi",
        });
      }
    }
    const newReport = await Report.create({
      reason,
      productId,
      userId,
    });
    // req.app.locals.io.emit("new_report", newReport);
    return res.status(200).json({
      status: true,
      message: "Gửi tố cáo thành công",
      newReport,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "đã có lỗi xảy ra với hệ thống ",
    });
  }
};
const getAllReport = async (req, res) => {
  try {
    const { role } = req.user;
    if (role === "admin" || role === "manager") {
      const getReport = await Report.find({ status: true })
        .sort({ createdAt: -1 })
        .populate("productId", "name slug ")
        .populate("userId", "userName  ")

        .exec();
      return res.status(200).json({
        status: true,
        getReport,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "đã có lỗi xảy ra với hệ thống ",
    });
  }
};
const updateReport = async (req, res) => {
  try {
    const { role } = req.user;
    const { _id } = req.params;
    const { view } = req.body;

    if (role === "admin" || role === "manager") {
      const updateReport = await Report.findByIdAndUpdate(
        _id,
        { view: view },
        { new: true }
      );
      return res.status(200).json({
        status: true,
        updateReport,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "đã có lỗi xảy ra với hệ thống ",
    });
  }
};

// *****************************************
const createrInterested = async (req, res) => {
  try {
    const { productId, reportedUserId } = req.body;

    const userId = req.user._id;

    if (productId) {
      const checkInterested = await Interested.findOne({ productId, userId });
      if (checkInterested) {
        return res.status(400).json({
          status: false,
          message: "Bạn đã quan tâm sản phẩm này rồi",
        });
      }
    }
    const newInterested = await Interested.create({
      userId,
      productId,
      reportedUserId,
    });
    // req.app.locals.io.emit("new_report", newReport);
    return res.status(200).json({
      status: true,
      message: "Gửi thành công",
      newInterested,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "đã có lỗi xảy ra với hệ thống ",
    });
  }
};

const getAllInterestedByUser = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({
        status: false,
        message: " Người dùng không tồn tại ",
      });
    }
    const getInterested = await Interested.find({
      reportedUserId: _id,
      status: true,
    })
      .sort({ createdAt: -1 })
      .populate("productId", "name slug ")
      .populate("userId", "userName  phone  address  ")
      .exec();
    return res.status(200).json({
      status: true,
      getInterested,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "đã có lỗi xảy ra với hệ thống ",
    });
  }
};
const updateInterested = async (req, res) => {
  try {
    const { _id } = req.params;
    const { view } = req.body;
    

    const updateReport = await Interested.findByIdAndUpdate(
      _id,
      { view: view },
      { new: true }
    );
    return res.status(200).json({
      status: true,
      updateReport,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "đã có lỗi xảy ra với hệ thống ",
    });
  }
};
module.exports = {
  createrReport,
  getAllReport,
  updateReport,
  createrInterested,
  getAllInterestedByUser,
  updateInterested,
};
