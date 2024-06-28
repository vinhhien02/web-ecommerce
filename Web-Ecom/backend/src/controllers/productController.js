const Product = require("../models/ProductModel");
const normalizeString = require("../config/slugtify.Config");
const Category = require("../models/CategoryModel");

const slugify = require("slugify");

// Controller functions
const createProduct = async (req, res) => {
  try {
    const { _id } = req.user;
    const { name, description, price, category } = req.body;
    const thumb = req.files?.thumb?.[0].path;
    const images = req.files?.images?.map((el) => el.path);
    if (images.length < 5) {
      return res.status(400).json({
        status: false,
        message: "Phải nhập trên 4 ảnh ",
      });
    }

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        status: false,
        message: "Nhập đủ thông tin",
      });
    }
    req.body.createdBy = { _id };

    if (thumb) req.body.thumb = thumb;
    if (images) req.body.images = images;

    const createNewProduct = await Product.create(req.body);
    const normalizedString = normalizeString(name);
    const slug = slugify(
      normalizedString + "-" + createNewProduct._id.toString().slice(-5)
    );

    await Product.findByIdAndUpdate(createNewProduct._id, { slug });

    return res.status(200).json({
      status: true,
      message: "Tạo sản phẩm thành công",
      data: createNewProduct,
    });
  } catch (e) {
    return res.status(404).json({
      message: "Đã xảy ra lỗi với hệ thống khi tạo sản phẩm",
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { query } = req.query;
    let filter = { status: true, checkByAdmin: true };
    if (query) {
      filter = { ...filter, $text: { $search: query } };
    }
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .populate("createdBy", "userName imageUser ")
      .exec();
    return res.status(200).json({
      status: true,
      message: "Lấy tất cả sản phẩm thành công",
      data: products,
    });
  } catch (error) {
    return res.status(404).json({
      message: false,
    });
  }
};

const getAllByAdmin = async (req, res) => {
  try {
    const { query } = req.query;
    let filter = {};
    if (query) {
      filter = {
        ...filter,
        name: { $regex: query, $options: "i" },
      };
    }
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .populate("createdBy", "userName imageUser ")
      .exec();

    return res.status(200).json({
      status: true,
      message: "Get all products successfully",
      data: products,
    });
  } catch (error) {
    return res.status(404).json({
      status: false,
      message: "Đã có lỗi xảy ra với hệ thống",
    });
  }
};

const getAllProductUser = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(200).json({
        status: false,
        message: "Tài khoản không tồn tại",
      });
    }

    const products = await Product.find({ createdBy: _id }).sort({
      status: -1,
    });

    if (!products.length) {
      return res.status(200).json({
        status: true,
        message: "Không có sản phẩm nào được tìm thấy",
      });
    }

    return res.status(200).json({
      status: true,
      message: "SUCCESS",
      products,
    });
  } catch (error) {
    return res.status(404).json({
      message: false,
      error: error.message,
    });
  }
};
const getAllProductCurrent = async (req, res) => {
  try {
    const { _id } = req.user;
    const query = req.query.query;
    if (!_id) {
      return res.status(200).json({
        status: false,
        message: "Tài khoản không tồn tại",
      });
    }
    let filter = { createdBy: _id };
    if (query) {
      filter = {
        ...filter,
        name: { $regex: query, $options: "i" },
      };
    }

    const products = await Product.find(filter).sort({
      status: -1,
    });

    if (!products.length) {
      return res.status(200).json({
        status: true,
        message: "Không có sản phẩm nào được tìm thấy",
      });
    }

    return res.status(200).json({
      status: true,
      message: "SUCCESS",
      products,
    });
  } catch (error) {
    return res.status(404).json({
      message: false,
      error: error.message,
    });
  }
};

const getAllProductCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(200).json({
        status: false,
        message: "Danh mục không tồn tại",
      });
    }

    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Danh mục không tồn tại",
      });
    }

    const products = await Product.find({
      category: category._id,
      status: true,
    })
      .sort({ createdAt: -1 })
      .populate("category", "name slug")
      .populate("createdBy", "userName imageUser")
      .exec();

    if (!products.length) {
      return res.status(404).json({
        status: false,
        message: "Không có sản phẩm nào được tìm thấy",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Lấy tất cả sản phẩm có cùng danh mục thành công",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getDetailsProduct = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        status: false,
        message: "Sản phẩm không tồn tại",
      });
    }
    const detailProduct = await Product.findOne({ slug: slug })

      .populate("category", "name slug")
      .populate("createdBy", "userName imageUser address phone ")
      .exec();
    if (!detailProduct) {
      return res.status(404).json({
        status: false,
        message: "Sản phẩm không tồn tại",
      });
    }

    return res.status(200).json({
      status: true,
      message: "SUCCESS",
      data: detailProduct,
    });
  } catch (e) {
    return res.status(500).json({
      message: "đã có lỗi xảy ra với lấy chi tiết sản phẩm",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const { _id } = req.user;
    const { name, description, price, category, thumb, images, status } =
      req.body;

    const files = req?.files;

    if (files?.thumb) {
      req.body.thumb = files?.thumb?.[0].path;
    }
    if (files?.images) {
      req.body.images = files?.images?.map((el) => el.path);
    }

    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Nhập đủ thông tin name",
      });
    }
    if (!description) {
      return res.status(400).json({
        status: false,
        message: "Nhập đủ thông tin description ",
      });
    }
    if (!price) {
      return res.status(400).json({
        status: false,
        message: "Nhập đủ thông tin price",
      });
    }
    if (!category) {
      return res.status(400).json({
        status: false,
        message: "Nhập đủ thông tin category",
      });
    }
    const product = await Product.findOne({ slug: slug });
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Sản phẩm không tồn tại",
      });
    }
    if (product.createdBy.toString() !== _id) {
      return res.status(403).json({
        status: false,
        message: "Bạn không có quyền chỉnh sửa",
      });
    }

    const updateFields = {
      name,
      description,
      price,
      category,
      status,
      updatedBy: req.user._id,
    };

    if (thumb) updateFields.thumb = thumb;
    if (images) updateFields.images = images;

    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      { $set: updateFields },
      { new: true }
    );

    if (name && updatedProduct.name !== name) {
      const normalizedString = normalizeString(name);
      const slug = slugify(
        normalizedString + "-" + updatedProduct._id.toString().slice(-5)
      );
      updatedProduct.slug = slug;
      await updatedProduct.save();
    }

    return res.status(200).json({
      status: true,
      message: "Cập nhật sản phẩm thành công",
      data: updatedProduct,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: "Đã xảy ra lỗi với hệ thống khi cập nhật sản phẩm",
    });
  }
};

const updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ status: false, message: "Trường status là bắt buộc." });
    }
    const statusValue = typeof status === "string" ? status === "true" : status;
    const product = await Product.findOne({ _id: id, createdBy: _id });
    if (!product) {
      return res.status(404).json({
        status: false,
        message:
          "Sản phẩm không tồn tại hoặc bạn không có quyền cập nhật sản phẩm này",
      });
    }

    product.status = statusValue;
    await product.save();

    res.status(200).json({
      status: true,
      message: "Cập nhật trạng thái sản phẩm thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, role } = req.user;

    if (!id) {
      return res.status(200).json({
        status: false,
        message: "Sản phẩm không tồn tại",
      });
    }

    const checkProduct = await Product.findOne({ _id: id });
    if (!checkProduct) {
      return res.status(404).json({
        status: false,
        message: "Sản phẩm không tồn tại",
      });
    }

    if (
      checkProduct.createdBy.toString() !== _id &&
      !(role === "admin" || role === "manager")
    ) {
      return res.status(403).json({
        status: false,
        message: "Bạn không có quyền xóa sản phẩm này.",
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Xóa sản phẩm thành công",
    });
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      message: "đã có lỗi xảy ra với xóa sản phẩm",
    });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getAllByAdmin,
  getDetailsProduct,
  updateProduct,
  getAllProductUser,
  getAllProductCurrent,
  deleteProduct,
  getAllProductCategory,
  updateProductStatus,
};
