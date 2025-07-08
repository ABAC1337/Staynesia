const userRepo = require("../../repositories/userRepository");
const ErrorHandler = require("../../../../utils/errorHandler");
const bcrypt = require("../../../../utils/bcrypt");
const jwt = require("../../../../utils/jwt");

const createUser = async (data) => {
    if (!data) throw new ErrorHandler("Credential not found", 404);
    const { name, username, email, password, confirmPassword, phone, role } = data;
    console.log(password, confirmPassword);
    
    if (password !== confirmPassword)
      throw new ErrorHandler("Password Not Match", 401);
    const hashPassword = await bcrypt.hashPassword(password);
    const queryObj = { name, username, email, phone, hashPassword, role };
    return await userRepo.createUser(queryObj);
};

const loginUser = async (data) => {
    if (!data) throw new ErrorHandler("Credential not found", 404);
    const queryObj = {}
    const filterObj = {
      $or: [{ email: data.field1 }, { username: data.field1 }],
    };
    const optionsObj = {
      select: '-listings -bookings -wishlist -reviews -payments'
    }
    queryObj.filterObj = filterObj
    queryObj.optionsObj = optionsObj
    const user = await userRepo.findUser(queryObj);

    if (!user[0] || user[1])
      throw new ErrorHandler("Username or email not found", 404);
    // Checking if password match
    const isMatch = await bcrypt.comparePassword(
      data.field2,
      user[0].hashPassword
    );
    if (!isMatch) throw new ErrorHandler("Password incorrect", 404);
    // Generate token
    const payloadToken = {
      id: user[0]._id,
      name: user[0].name,
      username: user[0].username,
      email: user[0].email,
      role: user[0].role,
    };
  return jwt.generateToken(payloadToken);
};

const deleteAccount = async (id) => {
    if (!id) throw new ErrorHandler("Account not found", 404);
    return await userRepo.deleteUser(id);
};

const updateProfile = async (data) => {
    if (!data || !data.id) throw new ErrorHandler("Account not found", 404);
    const { id, username, name, email, password } = data;
    queryObj = {};

    if (username) queryObj.username = username;
    if (name) queryObj.name = name;
    if (email) queryObj.email = email;

    const user = await userRepo.findUserById(id);
    const isMatch = await bcrypt.comparePassword(password, user.hashPassword);
    if (!isMatch) throw new ErrorHandler("Password incorrect", 401);
    return await userRepo.updateUser(id, queryObj);
};

const resetPassword = async (id, data) => {
    if (!id) throw new ErrorHandler("Account not found", 404);
    if (!data) throw new ErrorHandler("Field was empty", 404);
    const user = await userRepo.findUserById(id);
    const validation = await bcrypt.comparePassword(
      data.oldPassword,
      user.hashPassword
    );
    if (!validation) throw new ErrorHandler("Password incorrect", 404);
    if (data.newPassword !== data.confirmPassword)
      throw new ErrorHandler("Password not match", 400);
    const hashed = await bcrypt.hashPassword(data.newPassword);
    return await userRepo.updateUser(id, { hashPassword: hashed });
};



module.exports = {
  createUser,
  loginUser,
  updateProfile,
  deleteAccount,
  resetPassword,
};
