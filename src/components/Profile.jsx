import React from "react";
import { Container, Stack } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import "../Style/Profile.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBTypography,
  MDBIcon,
  MDBCardImage,
} from "mdb-react-ui-kit";

const Profile = ({ user, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <MDBContainer className="py-5 h-100" style={{ backgroundColor: "black" }}>
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="6" className="mb-4 mb-lg-0">
          <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
            <MDBRow className="g-0">
              <MDBCol
                md="4"
                className="gradient-custom text-center text-white"
                style={{
                  borderTopLeftRadius: ".5rem",
                  borderBottomLeftRadius: ".5rem",
                }}
              >
                <MDBCardImage
                  src={user.avatar && user.avatar.url}
                  alt="Avatar"
                  className="my-5"
                  style={{ width: "80px" }}
                  fluid
                />
                <MDBTypography tag="h5">{user.name}</MDBTypography>
                <MDBCardText>Profile </MDBCardText>
                <MDBIcon far icon="edit mb-5" />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h6">Information</MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Email</MDBTypography>
                      <MDBCardText className="text-muted">
                        {user.email}
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Phone</MDBTypography>
                      <MDBCardText className="text-muted">
                        {user.phone}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Profile;
