import React from "react";
import style from "../Styles/Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate() ;
  const handleLogout = () => {
    localStorage.removeItem("redWhiteToken")
    navigate("/login")
  };
  return (
    <>
      <nav className={`navbar bg-primary-subtle ${style.navbarContainer}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Blogs
          </Link>
          <div className="d-flex p-2">
            <div
              className="d-flex align-items-center border p-2 border border-primary"
              style={{
                cursor: "pointer",
                background: "#9A616D",
                color: "white",
              }}
            >
              <Link
                to="/profile"
                className="d-flex align-items-center"
                style={{ color: "white", textDecoration: "none" }}
              >
                <i
                  className="bi bi-person-fill"
                  style={{ fontSize: "20px", marginRight: "5px" }}
                ></i>
                <p className="mb-0">Profile</p>
              </Link>
            </div>
            <div
              className="d-flex border p-2 ms-3 border border-primary"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              logout
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
