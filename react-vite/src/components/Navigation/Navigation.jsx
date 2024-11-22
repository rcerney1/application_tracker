import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaHome, FaUser, FaFileAlt, FaBriefcase, FaSignOutAlt } from "react-icons/fa"; // Importing icons
import { thunkLogout } from "../../redux/session";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleLogout = () => {
    dispatch(thunkLogout());
  };

  return (
    <div className="navigation-container">
      <div className="sidebar">
        <h2>App Tracker</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="/">
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                <FaUser /> Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/my_cover_letters">
                <FaFileAlt /> My Cover Letters
              </NavLink>
            </li>
            <li>
              <NavLink to="/myjobtracker">
                <FaBriefcase /> My Job Tracker
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="username-logout-container">
          <div className="username">
            <FaUser /> {user.username}
          </div>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
