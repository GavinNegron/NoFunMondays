import * as Yup from "yup";

const registerSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required").email("Enter a valid email address"),
  password: Yup.string().required("Password is required"),
  password_confirmation: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords do not match."),
});

const loginSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter a valid email address"),
  password: Yup.string().required("Password is required"),
});

const resetPasswordSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter a valid email address"),
});

const verifyEmailSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter a valid email address"),
  otp: Yup.string().required("OTP is required").length(6, "OTP must be exactly 6 characters"),
});

const changePasswordSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter a valid email address"),
  otp: Yup.string().required("OTP is required").length(6, "OTP must be exactly 6 characters"),
});

export { registerSchema, loginSchema, resetPasswordSchema, verifyEmailSchema };