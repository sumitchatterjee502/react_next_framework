import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function LoginBlock(props) {
    return (
        <Row>
            <Col md={6}>
                {props.children}
            </Col>
            <Col md={6}></Col>
        </Row>
    )
}
