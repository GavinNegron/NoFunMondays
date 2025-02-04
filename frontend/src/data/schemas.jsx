import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required").email("Enter a valid email address"),
  password: Yup.string().required("Password is required"),
  password_confirmation: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords do not match."),
});

export const loginSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter a valid email address"),
  password: Yup.string().required("Password is required"),
});

export const resetPasswordSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter a valid email address"),
});

export const verifyEmailSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter a valid email address"),
  otp: Yup.string().required("OTP is required").length(6, "OTP must be exactly 6 characters"),
});

export const changePasswordSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter a valid email address"),
  otp: Yup.string().required("OTP is required").length(6, "OTP must be exactly 6 characters"),
});

export const contactSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter a valid email address"),
  message: Yup.string().required("Message is required")
})