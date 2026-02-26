import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Alert, Spinner } from 'react-bootstrap';
import '../Styles/Photo.css';

function PhotosManagement() {

    const [photos, setPhotos] = useState([]);
    const [form, setForm] = useState({ title: "", file: null });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const token = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    };

    // Fetch Photos
    const fetchPhotos = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "https://snapvault-backend-j3e1.onrender.com/api/photo/show",
                token
            );

            setPhotos(res.data.data);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch photos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPhotos(); }, []);

    // Add Photo
    const addPhoto = async () => {

        if (!form.title || !form.file) {
            setError("All fields are required");
            return;
        }

        try {

            const data = new FormData();
            data.append("title", form.title);
            data.append("image", form.file);

            const res = await axios.post(
                "https://snapvault-backend-j3e1.onrender.com/api/photo/add",
                data,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            setMessage(res.data.message);
            setError("");
            setForm({ title: "", file: null });
            fetchPhotos();

        } catch (err) {
            setError(err.response?.data?.message || "Failed to upload photo");
            setMessage("");
        }
    };

    // Delete Photo
    const deletePhoto = async (id) => {
        try {
            const res = await axios.delete(
                `https://snapvault-backend-j3e1.onrender.com/api/photo/erase/${id}`,
                token
            );

            setMessage(res.data.message);
            setError("");
            fetchPhotos();

        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete photo");
            setMessage("");
        }
    };

    return (
        <Container className="mt-4">

            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Upload Form */}
            <Row className="mb-4">
                <Col>
                    <Form.Control
                        placeholder="Title"
                        value={form.title}
                        onChange={e =>
                            setForm({ ...form, title: e.target.value })
                        }
                    />
                </Col>

                <Col>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={e =>
                            setForm({ ...form, file: e.target.files[0] })
                        }
                    />
                </Col>

                <Col>
                    <Button onClick={addPhoto}>
                        Upload Photo
                    </Button>
                </Col>
            </Row>

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}

            {/* Display Photos */}
            <Row>
                {photos.map(p => (
                    <Col md={4} key={p._id}>
                        <Card className="p-2 mb-4">
                            <img
                                src={`https://snapvault-backend-j3e1.onrender.com/uploads/photos/${p.imagePath}`}
                                height="200"
                                alt="photo"
                            />
                            <h5 className="mt-2">{p.title}</h5>
                            <Button
                                variant="danger"
                                onClick={() => deletePhoto(p._id)}
                            >
                                Delete
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>

        </Container>
    );
}

export default PhotosManagement;