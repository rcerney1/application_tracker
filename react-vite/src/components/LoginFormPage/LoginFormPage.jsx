import { useState, useEffect } from "react";
import { thunkLogin, thunkAuthenticate } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (sessionUser) {
      navigate("/");
    } else {
      dispatch(thunkAuthenticate());
    }
  }, [dispatch, sessionUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({ email, password })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  const handleDemoLogin = async () => {
    const serverResponse = await dispatch(
      thunkLogin({ email: "demo@aa.io", password: "password" })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome To Application Tracker</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label className='label-for-login'>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="error-text">{errors.email}</p>}
          <label className="label-for-login">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="error-text">{errors.password}</p>}
          <button type="submit" className="login-button">Log In</button>
        </form>
        <button onClick={handleDemoLogin} className="demo-button">Demo Login</button>
        <p className="signup-text">
          Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginFormPage;
