import React, { useState } from "react";
import userSchema from "../utils/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import getApi from "../utils/api";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/joanna-kosinska-1_CMoFsPfso-unsplash.jpg" ;
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver :zodResolver(userSchema) });
  const [msg, setMsg] = useState() ;
  const navigate = useNavigate()
  const formData =  async(data) => {
    try {
        console.log(data)
        const response = await getApi.post("/user/signup", data);
        let res = response.data.message
        setMsg(res);
        console.log(response)
        if(res == "successfully registered") {
            navigate("/login")
        }
        
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                     src={img}
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem", height : "100%" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit(formData)}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">SIGN UP</span>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Register your account
                        </h5>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="name"
                            {...register("name", { required: true })}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Username
                          </label>
                          {errors.name && (
                            <p className="text-danger text-opacity-75">
                              {errors.name?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            name="password"
                            {...register("password", { required: true })}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                          {errors.password && (
                            <p className="text-danger text-opacity-75">
                              {errors.password?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example28"
                            className="form-control form-control-lg"
                            name="rePassword"
                            {...register("rePassword", { required: true })}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Re-Password
                          </label>
                          {errors.rePassword && (
                            <p className="text-danger text-opacity-75">
                              {errors.rePassword?.message}
                            </p>
                          )}
                        </div>
                        <p className="text-info text-opacity-75">
                              {msg}
                            </p>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Do have an account?{" "}
                          <Link to="/login" style={{ color: "#393f81" }}>
                            Login
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
