import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Managers/UserProfileManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

export default function Login({ setIsLoggedIn, setLoggedInUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    login({ email, password })
      .then((user) => {
        localStorage.setItem("userProfile", JSON.stringify(user));
        setLoggedInUser(user);
        setIsLoggedIn(true);
        navigate(`/userProfile/${user.id}`); // Navigate to the user profile using user.id
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Container
      className="my-5 d-flex justify-content-center align-items-center"
      style={{
        height: "80vh",
        maxWidth: "400px",
      }}
    >
      <div
        style={{
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "30px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-center mb-4">
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </h2>
        <Form onSubmit={loginSubmit}>
          <fieldset>
            <FormGroup>
              <Label for="email">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Email
              </Label>
              <Input
                id="email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">
                <FontAwesomeIcon icon={faKey} className="mr-2" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </FormGroup>

            <FormGroup className="text-center mt-4">
              <Button color="primary" size="lg">
                Login
              </Button>
            </FormGroup>
          </fieldset>
        </Form>
        <div className="text-center mt-4">
          <em>
            Not registered? <Link to="/register">Register</Link>
          </em>
        </div>
      </div>
    </Container>
  );
}
