import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Card, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import CreateTaskModal from "./CreateTaskModal.jsx";
import UpdateTaskModal from "./UpateTaskModal.jsx";
import ViewTaskModal from "./ViewTaskModal.jsx";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { Navigate } from "react-router-dom";
import "../Style/Home.css";

const Home = ({ isAuthenticated, tasks, setTasks, taskTitle }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);
  const [updatedTaskId, setUpdateTaskId] = useState(null);

  const deleteTask = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/v1/task/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prevTasks) => prevTasks.filter((tasks) => tasks._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleCreateModalShow = () => setShowCreateModal(true);

  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    setViewTaskId(id);
    setShowViewModal(true);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>{taskTitle}</h1>
        <Button
          variant="primary"
          size="sm"
          onClick={handleCreateModalShow}
          style={{ fontSize: "0.875rem", padding: "0.25rem 0.5rem" }}
        >
          Create Task
        </Button>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="col">
              <Card className="h-100 shadow">
                <Card.Body>
                  <Card.Title className="mb-3">{task.title}</Card.Title>
                  <Card.Text>{task.description}</Card.Text>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="outline-primary"
                      onClick={() => handleUpdateModalShow(task._id)}
                    >
                      <MdEdit className="me-1" /> Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => deleteTask(task._id)}
                      className="mx-2"
                    >
                      <MdDelete className="me-1" /> Delete
                    </Button>
                    <Button
                      variant="outline-info"
                      onClick={() => handleViewModalShow(task._id)}
                    >
                      <FaEye className="me-1" /> View
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <h1>YOU DON'T HAVE ANY {taskTitle}</h1>
        )}
      </div>

      <CreateTaskModal
        handleCreateModalClose={handleCreateModalClose}
        showCreateModal={showCreateModal}
        setTasks={setTasks}
      />

      <UpdateTaskModal
        handleUpdateModalClose={handleUpdateModalClose}
        showUpdateModal={showUpdateModal}
        id={updatedTaskId}
        setTasks={setTasks}
      />

      <ViewTaskModal
        handleViewModalClose={handleViewModalClose}
        showViewModal={showViewModal}
        id={viewTaskId}
      />
    </div>
  );
};

export default Home;
