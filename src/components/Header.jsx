import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../Style/Header.css";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = ({
  setTasks,
  setIsAuthenticated,
  isAuthenticated,
  setTaskTitle,
}) => {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [isAuthenticated]);
  const navigateTo = useNavigate();
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/task/mytask",
        { withCredentials: true }
      );
      setAllTasks(response.data.tasks);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
      navigateTo("/login");
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filterTasks = (filterType) => {
    let filteredTasks = [];

    switch (filterType) {
      case "completed":
        filteredTasks = allTasks.filter((task) => task.status === "completed");
        setTaskTitle("Completed Tasks");
        break;
      case "incomplete":
        filteredTasks = allTasks.filter((task) => task.status === "incomplete");
        setTaskTitle("Incomplete Tasks");
        break;
      case "archived":
        filteredTasks = allTasks.filter((task) => task.archived === true);
        setTaskTitle("Archived Tasks");
        break;
      case "all":
        filteredTasks = allTasks;
        setTaskTitle("Tasks");
        break;
      default:
        filteredTasks = allTasks;
    }
    setTasks(filteredTasks);
  };

  return (
    // <div className={`sidebar ${!isAuthenticated ? "d-none" : ""}`}>
    //   <div className="sidebar-header">
    //     <h3>TASK MANAGER</h3>
    //   </div>

    //   <ul className="nav">
    //     <li>
    //       <Link to={"/"} className="nav-link">
    //         Home
    //       </Link>
    //     </li>
    //     <li className="dropdown">
    //       <a href="#" className="nav-link dropdown-toggle">
    //         Filter Tasks
    //       </a>
    //       <ul className="dropdown-menu">
    //         <li>
    //           <button
    //             className="dropdown-item"
    //             onClick={() => filterTasks("all")}
    //           >
    //             All Tasks
    //           </button>
    //         </li>
    //         <li>
    //           <button
    //             className="dropdown-item"
    //             onClick={() => filterTasks("completed")}
    //           >
    //             Completed Tasks
    //           </button>
    //         </li>
    //         <li>
    //           <button
    //             className="dropdown-item"
    //             onClick={() => filterTasks("incomplete")}
    //           >
    //             Incomplete Tasks
    //           </button>
    //         </li>
    //         <li>
    //           <button
    //             className="dropdown-item"
    //             onClick={() => filterTasks("archived")}
    //           >
    //             Archived Tasks
    //           </button>
    //         </li>
    //       </ul>
    //     </li>
    //     <li>
    //       <Link to={"/profile"} className="nav-link">
    //         Profile
    //       </Link>
    //     </li>
    //     <li>
    //       <button className="nav-link logout-btn" onClick={handleLogout}>
    //         LOGOUT
    //       </button>
    //     </li>
    //   </ul>
    // </div>

    <Navbar
      expand="lg"
      className={`custom-navbar  ${!isAuthenticated ? "d-none" : ""}`}
    >
      <Container>
        <Navbar.Brand href="#home">TASK MANAGER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
            <NavDropdown title="Filter Tasks" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => filterTasks("all")}>
                All Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("completed")}>
                Completed Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("incomplete")}>
                Incomplete Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("archived")}>
                Archived Tasks
              </NavDropdown.Item>
            </NavDropdown>
            <Link to={"/profile"} className="nav-link">
              Profile
            </Link>
            <Button
              className="btn btn-outline-light ml-auto"
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
