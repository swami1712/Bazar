const createResult = (data, err) => {
  return err ? createError(err) : createData(data);
};

const createError = (err) => {
  return {
    status: "error",
    data,
  };
};

const createSuccess = (data) => {
  return { status: "success", data };
};
