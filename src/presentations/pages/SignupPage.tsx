import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import TextField from "../components/TextField";
import { FiArrowRight } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../core/store";
import { ISignup } from "../../core/dtos";

interface ISignupForm extends ISignup {
  confirmPassword: string;
}

export default function SignupPage() {
  const navigate = useNavigate();
  const authStore = useAuthStore((state) => state);
//   authStore.setResponseMessage("");

  const initialValues: ISignupForm = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };


  const handleSubmit = (value: ISignupForm) => {
    if (
      !value.username ||
      !value.password ||
      !value.password ||
      !value.confirmPassword
    ) {
        authStore.setResponseMessage("Please fill out the information completely!");
    } else {
      authStore.setResponseMessage("");
      authStore.fetchSignup({
        username: value.username,
        email: value.email,
        password: value.password,
      });
    }
  };

  if (authStore.access_token) {
    navigate("/");
  }

  return (
    <div className=" w-screen h-screen flex items-center justify-center">
      <div className=" w-full md:w-[900px] h-3/4 flex flex-col items-center overflow-visible px-5">
        <p className=" my-5 text-4xl w-[400px] text-center ">
          Create Your Account
        </p>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ errors }) => (
            <Form className="flex flex-col items-center w-full">
              <div className=" w-full md:w-[400px] flex flex-col space-y-4 items-center">
                <div className="overflow-hidden rounded-xl px-3 bg-light2 border border-[#b8bfc0] w-full">
                  <TextField
                    name="username"
                    type="text"
                    placeholder="Create your user name"
                  />
                </div>
                <div className="overflow-hidden rounded-xl px-3 bg-light2 border border-[#b8bfc0] w-full">
                  <TextField
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="overflow-hidden rounded-xl px-3 bg-light2 border border-[#b8bfc0] w-full">
                  <TextField
                    name="password"
                    type="password"
                    placeholder="Create your password"
                  />
                </div>
                <div className="overflow-hidden rounded-xl px-3 bg-light2 border border-[#b8bfc0] w-full">
                  <TextField
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
              <div className="w-[400px] px-4 py-3">
                <p className=" text-base text-[#ec4f4f]">
                  {authStore.response_message}
                </p>
              </div>
              <button
                className=" bg-blue-500 opacity-90 hover:opacity-100 w-56 text-light2 p-3 rounded-xl mt-5"
                type="submit"
              >
                <p className="text-white text-lg">Continue</p>
              </button>
            </Form>
          )}
        </Formik>
        <div className=" w-[320px] h-[1px] bg-[#b8bfc0] mb-16 mt-5" />
        <div className="text-2x mb-4">
          Have an Account?{" "}
          <Link to="/signin" className="text-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
