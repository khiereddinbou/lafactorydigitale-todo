import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser, InitialStateType } from "../redux/slice";
import LogoImg from "../assets/logo.svg";
import { getUsernameFromEmail } from "../utill/getUsername";

const Navbar = () => {
  const user = useSelector((state: InitialStateType) => state.user);
  const username = useMemo(
    () => getUsernameFromEmail(user?.email || ""),
    [user]
  );

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser(null));
  };

  return (
    <nav className="navbar bg-primary bg-opacity-50 border-bottom border-primary ">
      <div className="container">
        <Link className="navbar-brand text-light fs-3 logo" to="/">
          <img className="w-100" src={LogoImg} alt="React Logo" />
        </Link>

        {user && (
          <div className="d-flex gap-3 align-items-center">
            <span className="text-light text-capitalize">{username}</span>
            <button onClick={() => handleLogout()} className="btn btn-primary">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
