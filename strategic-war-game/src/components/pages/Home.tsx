import React from 'react';
import { Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ButtonGroup: React.FC = () => {
    const xsSpan = 6;
    const xsOffset = 3;
    const lgSpan = 4;
    const lgOffset = 4;
    return (
        <Row>
            <Col xs={{ span: xsSpan, offset: xsOffset }} lg={{ span: lgSpan, offset: lgOffset}}>
                <button type="button" className="btn btn-primary w-100 mb-2">Play Against Bot</button>
            </Col>
            
            <Col xs={{ span: xsSpan, offset: xsOffset }} lg={{ span: lgSpan, offset: lgOffset}}>
                <button type="button" className="btn btn-primary w-100 mb-2">Play Online</button>
            </Col>

            <Col xs={{ span: xsSpan, offset: xsOffset }} lg={{ span: lgSpan, offset: lgOffset}}>
                <button type="button" className="btn btn-primary w-100 mb-2">Personalize</button>
            </Col>

            <Col xs={{ span: xsSpan, offset: xsOffset }} lg={{ span: lgSpan, offset: lgOffset}}>
                <button type="button" className="btn btn-primary w-100 mb-2">Login</button>
            </Col>
        </Row>

    );
}

const HomePage: React.FC = () => {
    return (
        <div className="container mt-4">
            <ButtonGroup />
        </div>
    );
}

export default HomePage;