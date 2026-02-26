import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Alert, Spinner } from 'react-bootstrap';
import '../Styles/Video.css';

function VideosManagement() {

    const [videos, setVideos] = useState([]);
    const [form, setForm] = useState({ title: "", file: null });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const token = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    };

    // Fetch Videos
    const fetchVideos = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "https://snapvault-backend-j3e1.onrender.com/api/video/show",
                token
            );

            setVideos(res.data.data);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch videos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchVideos(); }, []);

    // Add Video
    const addVideo = async () => {

        if (!form.title || !form.file) {
            setError("All fields are required");
            return;
        }

        try {

            const data = new FormData();
            data.append("title", form.title);
            data.append("video", form.file);

            const res = await axios.post(
                "https://snapvault-backend-j3e1.onrender.com/api/video/add",
                data,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        
                    }
                }
            );

            setMessage(res.data.message);
            setError("");
            setForm({ title: "", file: null });
            fetchVideos();

        } catch (err) {
            setError(err.response?.data?.message || "Failed to upload video");
            setMessage("");
        }
    };

    // Delete Video
    const deleteVideo = async (id) => {
        try {
            const res = await axios.delete(
                `https://snapvault-backend-j3e1.onrender.com/api/video/erase/${id}`,
                token
            );

            setMessage(res.data.message);
            setError("");
            fetchVideos();

        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete video");
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
                        accept="video/*"
                        onChange={e =>
                            setForm({ ...form, file: e.target.files[0] })
                        }
                    />
                </Col>

                <Col>
                    <Button onClick={addVideo}>
                        Upload Video
                    </Button>
                </Col>
            </Row>

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}

            {/* Display Videos */}
            <Row>
                {videos.map(v => (
                    <Col md={4} key={v._id}>
                        <Card className="p-3 mb-4">
                            <video
                                src={`https://snapvault-backend-j3e1.onrender.com/${v.videoPath}`}
                                controls
                                height="200"
                            />
                            <h5 className="mt-2">{v.title}</h5>
                            <Button
                                variant="danger"
                                onClick={() => deleteVideo(v._id)}
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

export default VideosManagement;