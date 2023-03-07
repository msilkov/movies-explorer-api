const userResFormat = (user) => ({
  name: user.name,
  email: user.email,
  _id: user._id,
});

module.exports = {
  userResFormat,
};
