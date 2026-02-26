import React from 'react'
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styles/Home.css";
function Home() {
    return (
        <div className="home-wrapper">

            {/* HERO SECTION */}
            <section className="hero-section">
                <Container>
                    <Row className="align-items-center">

                        <Col md={6}>
                            <h1 className="brand-name">SnapVault</h1>
                            <h5 className="tagline">Secure. Store. Stream.</h5>

                            <p className="description">
                                SnapVault is a powerful desktop media management application
                                built using MERN Stack and CEF technology.
                                It allows users to securely upload, organize,
                                and manage their photos and videos in one protected vault.
                                Designed for speed, security, and seamless desktop experience.
                            </p>

                            <div className="hero-buttons">
                                <Button
                                    as={Link}
                                    to="/register"
                                    className="primary-btn me-3"
                                >
                                    Create Account
                                </Button>

                                <Button
                                    as={Link}
                                    to="/login"
                                    variant="outline-light"
                                >
                                    Already Registered? Login
                                </Button>
                            </div>
                        </Col>

                        <Col md={6} className="text-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                                alt="media illustration"
                                className="hero-img"
                            />
                        </Col>

                    </Row>
                </Container>
            </section>

            {/* FEATURES SECTION */}
            <section className="features-section">
                <Container>
                    <h2 className="text-center mb-5">Why Choose SnapVault?</h2>

                    <Row>
                        <Col md={4}>
                            <Card className="feature-card">
                                <Card.Body>
                                    <h5>🔐 Secure Authentication</h5>
                                    <p>
                                        JWT-based login system with encrypted passwords,
                                        profile management and password recovery.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className="feature-card">
                                <Card.Body>
                                    <h5>📂 Organized Albums</h5>
                                    <p>
                                        Create albums, upload media files, edit details,
                                        and manage everything with full CRUD functionality.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className="feature-card">
                                <Card.Body>
                                    <h5>🖥 Desktop Powered</h5>
                                    <p>
                                        Built using Chromium Embedded Framework (CEF)
                                        to deliver smooth and fast desktop performance.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* FINAL CTA */}
            <section className="cta-section text-center">
                <Container>
                    <h3>Start Securing Your Media Today</h3>
                    <Button
                        as={Link}
                        to="/register"
                        className="primary-btn mt-3"
                    >
                        Get Started with SnapVault
                    </Button>
                </Container>
            </section>

        </div>
    )
}

export default Home