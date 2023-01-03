import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import TextField from "../components/TextField";
import { FiArrowRight } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../core/store";
import { ISignin } from "../../core/dtos";

export default function SigninPage() {
  const navigate = useNavigate();
  const authStore = useAuthStore((state) => state);
  const initialValues: ISignin = { username: "", password: "" };
  const [error, setError] = useState<string>("");
  const handleSubmit = (value: ISignin) => {
    if (!value.username || !value.password)
      setError("Please fill out the information completely!");
    else {
      setError("");
      authStore.fetchSignin({
        username: String(value.username),
        password: String(value.password),
      });
    }
  };

  if (authStore.access_token) {
    navigate("/");
  }

  return (
    <div className=" w-screen h-screen flex items-center justify-center">
      <div className=" w-full md:w-[900px] h-3/4 flex flex-col items-center overflow-visible">
        <p className=" my-5 text-4xl w-[400px] text-center">Sign in</p>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <div
                className=" w-full md:w-[400px] h-[100px] flex flex-row items-center 
            rounded-xl overflow-hidden bg-light2 px-3 border border-[#b8bfc0] space-x-4 py-3"
              >
                <div className="flex-1 flex flex-col items-center">
                  <TextField
                    name="username"
                    type="text"
                    placeholder="User name"
                  />
                  <div className=" w-full h-[1px] bg-[#b8bfc0] " />
                  <TextField
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <button
                  className=" w-14 flex items-center justify-center cursor-pointer h-full "
                  type="submit"
                >
                  <div className=" border border-black p-2 rounded-full">
                    <IconContext.Provider
                      value={{ color: "black", size: "1.3rem" }}
                    >
                      <FiArrowRight />
                    </IconContext.Provider>
                  </div>
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="w-[400px] px-4 py-3">
          <p className=" text-base text-[#ec4f4f]">{error}</p>
        </div>
        <div className=" w-[320px] h-[1px] bg-[#b8bfc0] my-6" />
        {/* <a href="#" className=" text-lg ">
        Forgot Email or Password?
      </a> */}
        <div className="text-2x my-2">
          Don't have an Account?{" "}
          <Link to="/signup" className="text-link">
            Create your now.
          </Link>
        </div>
      </div>
    </div>
  );
}


