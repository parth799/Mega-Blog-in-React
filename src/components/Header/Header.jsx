// import React from 'react';
import { Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="bg-gray-800 text-white py-4">
      <Container>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/">Parth</Link>
          </div>
          <nav>
            <ul className="flex space-x-4">
              {navItems.map(
                (item, index) =>
                  item.active && (
                    <li key={index}>
                      <Link to={item.slug} className="hover:text-gray-300">
                        {item.name}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </nav>
          <div>
            {authStatus ? (
              <LogoutBtn />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
