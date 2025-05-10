import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import "./Navbar.css";

import { api } from "../../utlis/api";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [category, setcategory] = useState([]);

  const { isAuth, user ,setuser,setisAuth } = useAuth();

  console.log(isAuth, user);


  const logoutHandler = ()=> {
    setuser(null)
    setisAuth(false)
    localStorage.removeItem('token')
    navigate('/')
  }

  const fetchCategory = async () => {
    try {
      const resp = await api.get(`/categories`);
      console.log(resp.data);
      setcategory(resp.data); //
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await api.get(`/products/search`, {
        params: { name: searchQuery },
      });

      const books = response.data; // array of books
      
      navigate('/search-result', {
        state: {
          books
        }
      })
      
    } catch (error) {
      console.error("Search error:", error);
      alert("An error occurred while searching for the book.");
    }

    setSearchQuery("");
    setSuggestions([]);
  };

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return [];
    }
    try {
      const res = await api.get(`/products/search`, {
        params: { name: query },
      });
      return res.data || [];
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      return [];
    }
  };

  const handleSuggestionSearch = async () => {
    try {
      const results = await fetchSuggestions(searchQuery);
      setSuggestions(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      handleSuggestionSearch();
    }, 300);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  return (
    <nav className="navbar navbar-expand-lg d-flex position-fixed-top">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <svg
            className="logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="#544233"
              d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5l0-377.4c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8L0 454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5l0-370.3c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11L304 456c0 11.4 11.7 19.3 22.4 15.5z"
            />
          </svg>
          <a className="siteName ms-2" href="#">
            Book Flare
          </a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse dropdown-bg" id="navbarSupportedContent" style={{height: "40px"}}>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           {/* Your menu links (Home, Shop, Category...) */}
        </ul>

        <div className="position-relative w-100 my-2 my-lg-0">
          <form
            className=" searchSection d-flex"
            onSubmit={handleSearch}
            // role="search for a book .."
            // style={{ width: "50%" }}
          >
            <input
              className="searchInput form-control me-2"
              type="search"
              placeholder="Search for a book..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn" type="submit">
              Search
            </button>
          </form>
        </div>

          <ul className="navbar-nav mb-4 gap-2">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./shop">
                Shop
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </a>
              <ul className="dropdown-menu">
                {category.map((item) => {
                  return (
                    <li key={item.id}>
                      <Link
                        className="dropdown-item"
                        state={{ name: item.name }}
                        to={`/category/${item.id}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="./contact">
                Contact
              </a>
            </li>

            <li className="nav-item dropdown text-black">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {isAuth && user.role === "admin" && (
                  <li>
                    <Link className="dropdown-item" to="admin/dashboard">
                      DashBoard
                    </Link>
                  </li>
                )}
                {isAuth && (
                  <li>
                    <Link className="dropdown-item" to="/users/profile">
                      Profile
                    </Link>
                  </li>
                )}
                <li>
                  <a className="dropdown-item" href="./login">
                    Login
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="./signup">
                    Sign Up
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {/* <li><a className="dropdown-item" href="./logout">Logout</a></li> */}

                <button onClick={logoutHandler} className="btn btn-1 border-0">Logout</button>

              </ul>
            </li>

            {/* <li className="nav-item">
              <a className="nav-link" href="./user/wishlist">
                <i className="bi bi-heart"></i>
              </a>
            </li> */}
            {/* Cart */}
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="bi bi-cart"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
