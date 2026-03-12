import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import "../Styles/Footer.css";

function Footer() {
    return (
        <footer className="footer-section">
            <Container>
                <Row className="py-5">

                    {/* Brand Section */}
                    <Col md={4} sm={12} className="mb-4">
                        <h4 className="footer-brand">Snapvault</h4>
                        <p className="footer-text">
                            Upload, manage and organize your photos & videos securely.
                        </p>

                        <div className="social-icons">
                            <FaFacebook />
                            <FaInstagram />
                            <FaGithub />
                            <FaLinkedin />
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col md={4} sm={12} className="mb-4">
                        <h5 className="footer-heading">Quick Links</h5>
                        <ul className="footer-links">
                            <li>Dashboard</li>
                            <li>Photos</li>
                            <li>Videos</li>
                            <li>Account Settings</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </Col>

                    {/* Contact Section */}
                    <Col md={4} sm={12} className="mb-4">
                        <h5 className="footer-heading">Contact</h5>
                        <p>Email: support@snapvault.com</p>
                        <p>Phone: +91 9585718894</p>
                        <p>Location: Villupuram</p>

                        <div className="newsletter-box">
                            <input type="email" placeholder="Subscribe Newsletter" />
                            <button>Subscribe</button>
                        </div>
                    </Col>

                </Row>

                <hr className="footer-line" />

                <Row>
                    <Col className="text-center pb-3">
                        <p className="copyright">
                            © 2026 Snapvault | Designed by VIJAYAPRATHAP
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer