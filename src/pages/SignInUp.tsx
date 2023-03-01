import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice";
import { publicRequest } from "../requestMethodes";

const SignInUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(false);
      setLoading(true);
      if (isLogin) {
        const res = await publicRequest.get(`/authentification?email=${email}`);
        const signInUser = res.data[0];
        signInUser ? dispatch(setUser(res.data[0])) : setError(true);
      } else {
        const res = await publicRequest.post("/authentification", { email });
        dispatch(setUser(res.data));
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <form
        onSubmit={handleSubmit}
        className="formWrapper bg-dark p-4 rounded-4"
      >
        <span className="fw-bolder fs-4 text-light mb-4">
          {isLogin ? "Login to your account" : "Create an account"}
        </span>
        <div className="mb-4">
          <label htmlFor="inputEmail" className="form-label text-light">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Your email address"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="inputEmail"
            required
          />
          {error && (
            <div className="form-text text-danger mt-1">
              Something went wrong!
            </div>
          )}
        </div>

        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary w-100"
        >
          {loading ? (
            <div className="spinner-border text-light"></div>
          ) : isLogin ? (
            "Sign in"
          ) : (
            "Sign up"
          )}
        </button>

        <div className="text-light text-center pt-3">
          If you {isLogin ? "don't" : ""} have an account{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary pointer"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignInUp;
