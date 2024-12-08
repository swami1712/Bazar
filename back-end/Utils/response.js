const createResult = (data, error) => {
  return err ? createError(error) : createSuccess(data);
};

const createError = (res, message) => {
  res.status(401).json({ success: false, message });
};

const createSuccess = (res, message, data) => {
  res.status(200).json({ success: true, message, data });
};

module.exports = {
  createResult,
  createSuccess,
  createError,
};
