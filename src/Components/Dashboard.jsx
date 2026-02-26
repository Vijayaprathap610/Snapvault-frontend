import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Button, Card, Col, Container, Form, Row, Alert } from "react-bootstrap";

function Dashboard() {

    const { user, logout, updateUser } = useContext(AuthContext);

    const [file, setFile] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    // ================= UPLOAD PROFILE =================
    const uploadProfile = async () => {

        if (!file) {
            setError("Please select a file first.");
            setMessage("");
            return;
        }

        try {
            setError("");
            setMessage("");

            const formData = new FormData();
            formData.append("profilePic", file);

            const res = await axios.put(
                "https://snapvault-backend-j3e1.onrender.com/api/auth/profile",
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            if (res.data.success) {
                setMessage(res.data.message);

                // 🔥 IMPORTANT: Update context user correctly
                updateUser(res.data.data);

                setFile(null);
            }

        } catch (err) {
            setMessage(""); // clear success
            setError(
                err.response?.data?.message ||
                "Profile upload failed."
            );
        }
    };

    // ================= DELETE ACCOUNT =================
    const deleteAccount = async () => {
        try {
            setError("");
            setMessage("");

            const res = await axios.delete(
                "https://snapvault-backend-j3e1.onrender.com/api/auth/delete",
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            if (res.data.success) {
                logout();
            }

        } catch (err) {
            setMessage("");
            setError(
                err.response?.data?.message ||
                "Delete failed."
            );
        }
    };

    // ================= RESET PASSWORD =================
    const handleResetPassword = async () => {

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("All password fields are required.");
            setMessage("");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            setMessage("");
            return;
        }

        try {
            setError("");
            setMessage("");

            const res = await axios.post(
                "https://snapvault-backend-j3e1.onrender.com/api/auth/change-password",
                {
                    oldPassword,
                    newPassword
                },
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            if (res.data.success) {
                setMessage(res.data.message);
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }

        } catch (err) {
            setMessage("");
            setError(
                err.response?.data?.message ||
                "Password change failed."
            );
        }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4 shadow text-center">

                        <h3 className="mb-3">Dashboard</h3>

                        {message && <Alert variant="success">{message}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}

                        {user?.profilePic ? (
                            <img
                                key={user.profilePic}
                                src={`https://snapvault-backend-j3e1.onrender.com/${user.profilePic}`}
                                alt="Profile"
                                width="150"
                                height="150"
                                className="rounded-circle mb-3"
                                style={{ objectFit: "cover" }}
                            />
                        ) : (
                            <div className="mb-3 text-muted">
                                No profile picture
                            </div>
                        )}

                        <h5>{user?.name}</h5>
                        <p className="text-muted">{user?.email}</p>

                        <Form.Control
                            type="file"
                            className="mb-2"
                            onChange={(e) => setFile(e.target.files[0])}
                        />

                        <Button
                            className="w-100 mb-3"
                            onClick={uploadProfile}
                        >
                            Upload Profile
                        </Button>

                        <hr />

                        <h5 className="mt-3">Change Password</h5>

                        <Form.Control
                            type="password"
                            placeholder="Old Password"
                            className="mb-2"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />

                        <Form.Control
                            type="password"
                            placeholder="New Password"
                            className="mb-2"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            className="mb-2"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <Button
                            variant="warning"
                            className="w-100 mb-3"
                            onClick={handleResetPassword}
                        >
                            Update Password
                        </Button>

                        <hr />

                        <Button
                            variant="danger"
                            className="w-100"
                            onClick={deleteAccount}
                        >
                            Delete Account
                        </Button>

                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;