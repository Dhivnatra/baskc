import React, { useEffect, useState } from "react";
import styles from "../../styles/page/Auth.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader";
// import coverPage from "../../assets/img/Medical prescription-amico.png";
function Auth() {
  const nav = useNavigate();
  // const [username, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [isDoctor, setDoctor] = useState(true);
  const [error, setError] = useState(false);
  const [resError, setReserror] = useState("");
  const [isloader, setLoader] = useState(false);
  useEffect(() => {
    isDoctor
      ? (document.title = "Doctor | Clinic")
      : (document.title = "Receptionist | Clinic");
  }, [isDoctor]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const token = await axios.post(
        // "http://localhost:3006/api/recept/logrecept",
        "https://careconnect-5ssb.onrender.com/api/recept/logrecept",
        {
          password: pass,
          email: email,
        }
      );
      const tok = JSON.stringify(token.data);
      localStorage.setItem("receptData", tok);
      // setReserror("Logging In");
      // setLogin(false);
      nav("/recept/dashboard");
      setLoader(false)
    } catch (err) {
      setLoader(false)
      console.log(err);
      setReserror(err.response.data.message);
      setError(true);
    }
  };
  const errorDetector = () => {
    setError(false);
    setReserror("");
  };
  const handleSign = async (e) => {
    e.preventDefault();
    setLoader(true);
    errorDetector();
    const data = {
      email: email,
      password: pass,
    };
    try {
      let tok = await axios.post(
        // "http://localhost:3006/api/docs/logdoc/",
        "https://careconnect-5ssb.onrender.com/api/docs/logdoc/",
        data
      );
      tok = JSON.stringify(tok);
      localStorage.setItem("docData", tok);
      // console.log(data.password)
      // setReserror(token.data.message);
      setReserror("Logging In");
      // setLogin(false);
      nav("/doc/dash");
      setLoader(false)
    } catch (err) {
      setLoader(false)
      console.log(err);
      setReserror("Error " + err);
      setError(true);
    }
  };
  return (
    <div className={styles.webPage}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          {isloader && <div className={styles.overlay}><Loader /></div>}
          {!isloader && (
            <>
              {isDoctor ? <h2>Doctor!</h2> : <h2>Receptionist!</h2>}
              <p>Sign In To Your Account</p>
              <form
                className={styles.form}
                onSubmit={isDoctor ? handleSign : handleLogin}
              >
                <div className={styles.contentWrap}>
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.contentWrap}>
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
                <div className={styles.contentWrap}>
                  <div className={styles.buttonWrap}>
                    <button className={styles.btn} type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              <p
                className={styles.accessChange}
                onClick={() => {
                  setDoctor((prev) => !prev);
                }}
              >
                {isDoctor ? "Not A Doctor ?" : "Not A Receptionist"}
              </p>
            </>
          )}
        </div>
        <div className={styles.textContainer}>
          <h1>Welcome Back!</h1>
          <p>
            "Medicine is not only a science; it is also an art. It does not
            consist of compounding pills and plasters; it deals with the very
            processes of life, which must be understood before they may be
            guided." - Paracelsus
          </p>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
