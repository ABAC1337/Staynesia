const userRepo = require("../../repositories/userRepository");
const ErrorHandler = require("../../../../utils/errorHandler");
const bcrypt = require("../../../../utils/bcrypt");
const jwt = require("../../../../utils/jwt");
const mailer = require("../../../../utils/mailer")

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
    phone: user[0].phone,
    imgUrl: user[0].imageUrl,
    role: user[0].role,
  };
  return jwt.generateToken(payloadToken);
};

const deleteAccount = async (id) => {
  if (!id) throw new ErrorHandler("Account not found", 404);
  return await userRepo.deleteUser(id);
};

const updateProfile = async (id, data) => {
  if (!id) throw new ErrorHandler("Account not found", 404);
  console.log(data);
  const { name, username, email, phone, password } = data;
  queryObj = {};

  if (username || !username == '')
    queryObj.username = username;
  if (name || !name == '')
    queryObj.name = name;
  if (email || !email == '')
    queryObj.email = email;
  if (phone || !phone == '')
    queryObj.phone = phone

  const user = await userRepo.findUserById(id);
  const isMatch = await bcrypt.comparePassword(password, user.hashPassword);
  if (!isMatch)
    throw new ErrorHandler("Password incorrect", 401);

  await userRepo.updateUser(id, queryObj);
  const updated = await userRepo.findUserById(id)
  const payloadToken = {
    id: updated._id,
    name: updated.name,
    username: updated.username,
    email: updated.email,
    phone: updated.phone,
    imgUrl: updated.imageUrl,
    role: updated.role,
  };
  return jwt.generateToken(payloadToken)
};

function generateAlphanumeric(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const forgotPasswordToken = async (email) => {
  if (!email) throw new ErrorHandler("Input was empty")

  const filterObj = { email: email }
  const queryObj = { filterObj }
  const user = await userRepo.findUser(queryObj)
  if (!user[0]) throw new ErrorHandler("Email Not Found", 404)

  const OTP = generateAlphanumeric(7)
  await mailer.sendEmail(email, "Confirmation Reset Password", `nih otpnya yh ${OTP}`)
  const payload = {
    secret: OTP,
    id: user[0]._id
  }
  return jwt.generateToken(payload)
}

const verifyOTP = async (token, data) => {
  if (!token) throw new ErrorHandler('Token was empty', 404)
  if (!data) throw new ErrorHandler('Input was empty')

  if (token.secret !== data)
    throw new ErrorHandler('OTP incorrect', 403)
  return true
}

const forgotPassword = async (token, data) => {
  if (!data) throw new ErrorHandler('Input Was Empty', 404)
  if (!token) throw new ErrorHandler('Token was empty')
  const user = await userRepo.findUserById(token.id)
  const compare = await bcrypt.comparePassword(
    data.oldPassword,
    user.hashPassword
  )
  if (!compare) throw new ErrorHandler('Password wrong', 401)
  if (data.newPassword !== data.confirmPassword)
    throw new ErrorHandler('Password not match')
  const hashed = await bcrypt.hashPassword(data.newPassword)
  return await userRepo.updateUser(user._id, { hashPassword: hashed })
}

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
  forgotPasswordToken,
  verifyOTP,
  forgotPassword
};
