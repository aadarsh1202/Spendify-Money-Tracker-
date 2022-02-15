import React from "react";
import Navbar from "./Navbar";
import classes from "./css/myAccount.module.css";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("loginData"));
  const fullname = data.fullname;
  const emailid = data.emailid;

  const logout = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <Navbar></Navbar>
      <section>
        <div className="container">
          <div className={classes.box}>
            <div className={`row ${classes.p}`}>
              <div className={`row my-2 ${classes.u}`}>
                <div className="col-6">
                  <h3 className={classes.a}>MyAccount</h3>
                </div>
                <div className="col-6 mb-2">
                  <button
                    type="button"
                    className={`btn btn-outline-secondary ${classes.btn}`}
                    onClick={logout}
                  >
                    Log out
                  </button>
                </div>
                <hr className="hr"></hr>
              </div>
              <div className="row my-2">
                <div className="col-5 ">
                  <img
                    src={require("./images/Alphabets/a.png")}
                    width="70"
                    height="70"
                    alt="Image"
                  />
                </div>
                <div className="col-6 ">
                  <h5 className={classes.a}>{fullname}</h5>
                  <h5 className={classes.low}>{emailid}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyAccount;
