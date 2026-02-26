import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await axios.post(
        "https://snapvault-backend-j3e1.onrender.com/api/auth/register",
        form
      );

      setMessage(res.data.message || "Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 col-md-6 shadow">
        <h3 className="text-center mb-3">Register</h3>

        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Control
            className="mb-3"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <Form.Control
            className="mb-3"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <Form.Control
            type="password"
            className="mb-3"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" animation="border" /> Registering...
              </>
            ) : "Register"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;