import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Container, Form, Alert, Spinner } from 'react-bootstrap';
import { AuthContext } from '../Context/AuthContext';

function Login() {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // ================= HANDLE LOGIN =================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setError("Please fill all fields.");
            setMessage("");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setMessage("");

            const res = await axios.post(
                "https://snapvault-backend-j3e1.onrender.com/api/auth/login",
                form
            );

            if (res.data.success) {
                login(res.data);
                setMessage("Login successful!");
                navigate("/");
            }

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card className="p-4 col-md-6 shadow">
                <h3 className="text-center mb-3">Login</h3>

                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}

                <Form onSubmit={handleSubmit}>

                    {/* EMAIL */}
                    <Form.Control
                        type="email"
                        className="mb-3"
                        placeholder="Enter Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    {/* PASSWORD */}
                    <Form.Control
                        type="password"
                        className="mb-2"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />

                    {/* FORGOT PASSWORD LINK */}
                    <div className="text-end mb-3">
                        <Link to="/forgot-password" className="text-decoration-none">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* LOGIN BUTTON */}
                    <Button
                        type="submit"
                        className="w-100"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner size="sm" animation="border" /> Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>

                </Form>

                {/* OPTIONAL REGISTER LINK */}
                <div className="text-center mt-3">
                    Don’t have an account?{" "}
                    <Link to="/register">Register</Link>
                </div>

            </Card>
        </Container>
    );
}

export default Login;