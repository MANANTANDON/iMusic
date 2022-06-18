import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import landingPage from "./LandingPage.module.scss";
import logo from "../images/iMusic.png";

export const LandingPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmSignupPassword, setConfirmSignupPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [slide, setSlide] = useState(false);

  const [error, setError] = useState("");

  const { signup, login } = useAuth();
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    setError("");
    try {
      setLoading(true);
      await login(loginEmail, loginPassword);
      navigate("/artist");
    } catch {
      setError("credentials dont match");
    }
  };

  const signupHandler = async (event) => {
    event.preventDefault();

    setError("");

    if (signupPassword !== confirmSignupPassword) {
      return setError("passwords didnt match!");
    }
    try {
      setLoading(true);
      await signup(signupEmail, signupPassword);
      navigate("/artist");
    } catch {
      setError("sorry cant make your account");
    }
  };

  console.log(loading);
  return (
    <React.Fragment>
      <div className={landingPage.mainContainer}>
        <div className={landingPage.appName}>
          <img src={logo} height="80px" alt="" />
          <hr />
          <div className={landingPage.dots}>...</div>
        </div>

        <div
          className={
            !slide
              ? landingPage.outerContainer
              : landingPage.outerContainerMoved
          }
        >
          <div>{error && <div className={landingPage.error}>{error}</div>}</div>
          <form onSubmit={loginHandler} className={landingPage.loginContainer}>
            <input
              type="text"
              placeholder="email"
              onChange={(event) => setLoginEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(event) => setLoginPassword(event.target.value)}
            />
            <button type="submit">login</button>
          </form>
          <hr
            style={{
              marginTop: "20px",
              boxSizing: "border-box",
              width: "80%",
              border: "1px solid grey",
            }}
          />
          <div className={landingPage.textDeco}>
            <div>
              Don't have an{""}
              <span className={landingPage.colorText}>account</span> ?
            </div>
          </div>
          <div className={landingPage.getStartedButton}>
            <input
              type="button"
              value="Get Started"
              onClick={() => setSlide(true)}
            />
          </div>
        </div>
        <div
          className={
            slide
              ? landingPage.signupOuterContainerMoved
              : landingPage.signupOuterContainer
          }
        >
          <div style={{ fontSize: "25px", marginBottom: "20px" }}>
            Welcome<span className={landingPage.colorText}>User</span>,
          </div>
          <div>{error && <div className={landingPage.error}>{error}</div>}</div>
          <form
            onSubmit={signupHandler}
            className={landingPage.signupContainer}
          >
            <input
              type="text"
              placeholder="email"
              onChange={(event) => setSignupEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(event) => setSignupPassword(event.target.value)}
            />
            <input
              type="password"
              placeholder="confirm password"
              onChange={(event) => setConfirmSignupPassword(event.target.value)}
            />
            <button type="submit">signup</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
