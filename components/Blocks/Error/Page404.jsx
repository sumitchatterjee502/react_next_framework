import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Page404Style from '../../../styles/Page404.module.css';

export default function Page404() {
    return(
      <Container>
        <Row>
            <Col sm={12}>
                <Col sm={12} className="col-sm-offset-1  text-center">
                    <div className={Page404Style.four_zero_four_bg}>
                        <h1 className="text-center">404</h1>          
                    </div>
  
                    <div className={Page404Style.contant_box_404}>
                            <h3 className="h2">{`Look like you're lost`}</h3>
                        
                        <p>the page you are looking for not avaible!</p>
                      
                    </div>
                </Col>
            </Col>
        </Row>
      </Container>
    );
  }