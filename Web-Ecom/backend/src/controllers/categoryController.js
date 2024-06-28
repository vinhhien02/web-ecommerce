const Category = require("../models/CategoryModel");
const slugify = require("slugify");
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file;
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "nhập đủ thông tên ",
      });
    }
    if (!description) {
      return res.status(400).json({
        status: false,
        message: "nhập đủ thông tin chi tiết  ",
      });
    }
    if (!image) {
      return res.status(400).json({
        status: false,
        message: "Vui lòng chọn ảnh  ",
      });
    }
    let slug = slugify(name, { lower: true, remove: /[*+~.()'"!:@]/g });
    const createNewCategory = await Category.create({
      name,
      slug,
      description,
      image: req.file.path,
    });

    return res.status(200).json({
      status: true,
      message: "Tạo danh mục mới thành công",
      data: createNewCategory,
    });
  } catch (e) {
    return res.status(404).json({
      status: false,
      message: "Đã có lỗi xảy ra khi tạo danh mục ",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: false,
        message: "nhập đủ thông tin ",
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({
        status: false,
        message: "Danh mục không tồn tại ",
      });
    }
    return res.status(200).json({
      status: true,
      message: "cập nhật danh mục thành công",
      data: updatedCategory,
    });
  } catch (e) {
    return res.status(404).json({
      status: false,
      message: "đã có lỗi xảy ra khi cập nhật danh mục",
    });
  }
};
const getDetailCategory = async (req, res) => {
  try {
    const { _id } = req.params;

    const rs = await Category.findById(_id);
    if (!rs) {
      return res.status(404).json({
        status: false,
        message: "Danh mục không tồn tại",
      });
    }

    return res.status(200).json({
      status: true,
      message: "lấy danh mục thành công",
      rs,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: false,
      message: "đã có lỗi xảy ra khi lấy danh mục",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!_id) {
      return res.status(200).json({
        status: false,
        message: "the userId is required",
      });
    }

    const deleteCategory = await Category.findByIdAndDelete(_id);

    if (!deleteCategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Xóa danh mục thành công",
    });
  } catch (e) {
    return res.status(404).json({
      status: false,
      message: "đã có lỗi xảy ra khi xóa danh mục",
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find().sort({ createdAt: -1 });
    return res.status(200).json({
      status: true,
      message: "hiển thị tất cả danh mục thành công",
      data: allCategory,
    });
  } catch (e) {
    return res.status(404).json({
      status: false,
      message: "đã có lỗi xảy ra",
    });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getDetailCategory,
  deleteCategory,
  getAllCategory,
};
