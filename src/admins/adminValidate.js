import joi from "@hapi/joi";

const registerValidate = (data) => {
  const admin = {
    email: joi.string().max(50).email().required(),
    password: joi.string().min(6).max(255).required(),
    confirmPassword: joi.string().max(255).required(),
    fullName: joi.string().max(255).required(),
    phone: joi.number().min(9),
    address: joi.string().max(100).required(),
  };
  return joi.validate(data, admin);
};

const loginValidate = (data) => {
  const admin = {
    email: joi.string().max(255).email().required(),
    password: joi.string().max(255).required(),
  };
  return joi.validate(data, admin);
};

// const updateAdminValidate = (data) => {
//   const admin = {
//     name: joi.string().max(255).required(),
//     student_id: joi.number(),
//     phone: joi.number(),
//   };
//   return joi.validate(data, admin);
// };

const _registerValidate = registerValidate;
export { _registerValidate as registerValidate };
const _loginValidate = loginValidate;
export { _loginValidate as loginValidate };
// const _updateAdminValidate = updateAdminValidate;
// export { _updateAdminValidate as updateAdminValidate };