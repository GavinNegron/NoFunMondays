import * as Yup from "yup";

// VALIDATION
const nameRegex = /^[a-zA-Z\s]+$/; 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+=-]+$/;
const otpRegex = /^\d{6}$/; 
const messageRegex = /^[^<>]+$/; 

// REGISTRATION
export const registerSchema = Yup.object({
  name: Yup.string()
    .matches(nameRegex, "Invalid characters in name")
    .trim()
    .required("Name is required"),
  email: Yup.string()
    .matches(emailRegex, "Enter a valid email address")
    .trim()
    .required("Email is required"),
  password: Yup.string()
    .matches(passwordRegex, "Password contains invalid characters")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords do not match."),
});

// LOGIN
export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "Enter a valid email address")
    .trim()
    .required("Email is required"),
  password: Yup.string()
    .matches(passwordRegex, "Password contains invalid characters")
    .required("Password is required"),
});

// RESET PASSWORD
export const resetPasswordSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "Enter a valid email address")
    .trim()
    .required("Email is required"),
});

// VERIFY EMAIL
export const verifyEmailSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "Enter a valid email address")
    .trim()
    .required("Email is required"),
  otp: Yup.string()
    .matches(otpRegex, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

// CHANGE PASSWORD
export const changePasswordSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "Enter a valid email address")
    .trim()
    .required("Email is required"),
  otp: Yup.string()
    .matches(otpRegex, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

// CONTACT FORM
export const contactSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "Enter a valid email address")
    .trim()
    .required("Email is required"),
  name: Yup.string()
    .matches(nameRegex, "Invalid characters in name")
    .trim()
    .required("Name is required"),
  message: Yup.string()
    .matches(messageRegex, "Message contains invalid characters")
    .trim()
    .min(5, "Message must be at least 5 characters")
    .max(1000, "Message cannot exceed 1000 characters")
    .required("Message is required"),
});