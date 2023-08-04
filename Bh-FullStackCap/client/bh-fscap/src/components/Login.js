import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Managers/UserProfileManager";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    login({ email, password })
      .then((user) => {
        setIsLoggedIn(true);
        navigate(`/userProfile/${user.id}`); // Navigate to the user profile using user.id
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Container
      className="my-5"
      style={{
        maxWidth: "400px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "20px",
      }}
    >
      <Form onSubmit={loginSubmit}>
        <fieldset>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button>Login</Button>
          </FormGroup>
          <em>
            Not registered? <Link to="/register">Register</Link>
          </em>
        </fieldset>
      </Form>
    </Container>
  );
}
