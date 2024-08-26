import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          first_name: name,
          last_name: lastName,
          email: email,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Registration failed");
      }

      setSuccessMessage("Registration successful!");
      setUsername("");
      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="submit_form">
      <h2 className="form_title">ZAŁÓŻ KONTO</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form className="between_fields_spacing" onSubmit={handleSubmit}>
        <Form.Group className="between_fields_spacing" controlId="username">
          <Form.Label className="text-center">Nazwa użytkownika</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nazwa użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="between_fields_spacing" controlId="name">
          <Form.Label className="text-center">Imię</Form.Label>
          <Form.Control
            type="text"
            placeholder="Imię"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="between_fields_spacing" controlId="lastName">
          <Form.Label className="text-center">Nazwisko</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nazwisko"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="between_fields_spacing" controlId="email">
          <Form.Label className="text-center">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="between_fields_spacing" controlId="password">
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
            ZAŁÓŻ KONTO
          </Button>
        </div>
      </Form>
    </div>
  );
}
