import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Login failed");
      }


      // get
      const accessToken = responseData.access_token;

      // Save the access token in cookie
      // document.cookie = `accessToken=${accessToken}; path=/;`;
      document.cookie = `accessToken=${accessToken}; path=/; SameSite=None; Secure;`;



      setSuccessMessage("Login successful!");
      setUsername("");
      setPassword("");

      

      // Redirect to another path after successful login
      navigate("/");
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <div className="submit_form">
        <h2 className="form_title">ZALOGUJ SIĘ</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Form className="between_fields_spacing" onSubmit={handleSubmit}>
          <Form.Group
            className="between_fields_spacing"
            controlId="username"
          >
            <Form.Label className="text-center">Nazwa użytkownika</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nazwa użytkownika"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="between_fields_spacing"
            controlId="password"
          >
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="centered">
            <Button
              variant="big_submit"
              size="lg"
              type="submit"
            >
              ZALOGUJ SIĘ 
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
