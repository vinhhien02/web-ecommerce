const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Mã thông báo xác thực bị thiếu hoặc không hợp lệ",
      status: false,
    });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: `Mã xác thực không hợp lệ: ${err.message}`,
        status: false,
      });
    }
    req.user = {
      _id: decoded.id,
      role: decoded.role,
      ...decoded,
    };

    next();
  });
};
const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin")
    return res.status(401).json({
      message: "Bạn không có quyền thực hiện hành động này ",
      status: "error",
    });

  next();
};
const isManager = (req, res, next) => {
  const { role } = req.user;
  if (role !== "manager" && role !== "admin") {
    return res.status(401).json({
      message: "Bạn không có quyền thực hiện hành động này",
      status: "error",
    });
  }
  next();
};

// const authUserMiddleWare = (req, res, next) => {
//   verifyToken(req, res, () => {
//     const userId = req.params.id;
//     if (userId && (req.user.id === userId || req.user.isAdmin)) {
//       next();
//     } else if (!userId) {
//       if (req.user.isAdmin) {
//         next();
//       } else {
//         return res.status(403).json({
//           message: "Not authorized",
//           status: false,
//         });
//       }
//     } else {
//       return res.status(403).json({
//         message: "Bạn không có quyền truy cập dữ liệu của người dùng ",
//         status: false,
//       });
//     }
//   });
// };

module.exports = {
  verifyToken,

  isAdmin,
  isManager,
  // authUserMiddleWare: authUserMiddleWare,
};
