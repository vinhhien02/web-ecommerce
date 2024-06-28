const Favorite = require("../models/FavoriteModel");

const createFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;
    if (!productId) {
      return res
        .status(400)
        .json({ status: false, message: "Không có sản phẩm nào được chọn " });
    }
    const CheckFavorite = await Favorite.findOne({ productId, userId });
    if (CheckFavorite) {
      return res.status(400).json({
        status: false,
        message: "Sản phẩm đã có trong danh sách yêu thích",
      });
    }

    const favorite = new Favorite({ productId, userId });
    await favorite.save();

    res.status(201).json({
      status: true,
      message: "Đã thêm sản phẩm vào yêu thích",
      favorite,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};
const getFavorite = async (req, res) => {
  try {
    const { _id } = req.user;
    const favorites = await Favorite.find({ userId: _id }).populate(
      "productId",
      "name price slug thumb status"
    );

    res.status(200).json({
      status: true,
      message: "Lấy sản phẩm yêu thích thành công",
      favorites,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};
const deleteFavorite = async (req, res) => {
  try {
    const { _id } = req.params;
    const userId = req.user._id;
    if (!_id) {
      return res.status(404).json({
        status: false,
        message: "Mục yêu thích không tồn tại hoặc bạn không có quyền xóa nó",
      });
    }
    await Favorite.findOneAndDelete({
      _id: _id,
      userId,
    });

    res
      .status(200)
      .json({
        status: true,
        message: "Xóa thành sản phẩm yêu thích thành công",
      });
  } catch (error) {
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};

module.exports = {
  createFavorite,
  getFavorite,
  deleteFavorite,
};
