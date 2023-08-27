/**
 * Side Bar
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/NavSideBar.css";
import logo from "../resource/logo.jpeg";

export default function NavSideBar() {
  //Selected title
  const [sTitle, setSTitle] = useState("Billing");

  // Function to select navigation title
  function navTitle(title) {
    setSTitle(title);
  }
  return (
    <div className="navBar-container">
      <div className='image-container'>
        <img
          src={logo}
          width="200"
          alt="Logo"
          style={{ borderRadius: "200px" }}
        />
      </div>
      <div className="navBar-links">
        <ul>
          {data.map((item, index) => {
            return (
              <Link to={item.path} className="nav-link">
                <li
                  className={
                    sTitle === item.title ? "selected-li-navBar" : "li-navBar"
                  }
                  onClick={() => navTitle(item.title)}
                >
                  <span>
                    <h3>{item.title}</h3>
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/**
 * Data for nav bar Navigation
 *
 */

const data = [
  {
    title: "Billing",
    path: "/",
  },
  {
    title: "Products",
    path: "/products",
  },
  {
    title: "Stock",
    path: "/stock",
  },
  {
    title: "Report",
    path: "/report",
  },
];
