import "./SideNav.css";
import news from "../../utils/news.svg";
import insights from "../../utils/insights.svg";
import caseStudies from "../../utils/caseStudies.svg";
import logout from "../../utils/logout.svg";
import { NavLink, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import sharedContext from "../context/SharedContext";
import closeIcon from "../../utils/closeIcon.svg";
import toast from "react-hot-toast";

const SideNav = () => {
  const { isSideNavOpen, setIsSideNavOpen } = useContext(sharedContext);

  const location = useLocation();

  // Function to check if the current route matches a given path
  const isRouteActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsSideNavOpen(false);
        toast.success("logged out Successfully");
        console.log("User signed out");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="sideNav_con">
      <div className="closeBtn_con">
        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={() => setIsSideNavOpen(!isSideNavOpen)}
        />
      </div>
      <div className="Routes_con">
        <div className="categories_con">
          <NavLink
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: isRouteActive("/news") ? "gray" : "transparent",
              borderRadius: "5px",
            }}
            to="/news"
            onClick={() => setIsSideNavOpen(false)}
          >
            <div className="category">
              <img src={news} alt="News SVG" />
              <h3>News</h3>
            </div>
          </NavLink>
          <NavLink
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: isRouteActive("/insights")
                ? "gray"
                : "transparent",
              borderRadius: "5px",
            }}
            to="/insights"
            onClick={() => setIsSideNavOpen(false)}
          >
            <div className="category">
              <img src={insights} alt="insights SVG" />
              <h3>Insight</h3>
            </div>
          </NavLink>
          <NavLink
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: isRouteActive("/caseStudies")
                ? "gray"
                : "transparent",
              borderRadius: "5px",
            }}
            to="/caseStudies"
            onClick={() => setIsSideNavOpen(false)}
          >
            <div className="category">
              <img src={caseStudies} alt="caseStudies SVG" />
              <h3>Case Studies</h3>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="logout_con" onClick={handleLogout}>
        <h3>
          <u>Logout</u>
        </h3>
        <img src={logout} alt="caseStudies SVG" />
      </div>
    </div>
  );
};

export default SideNav;
