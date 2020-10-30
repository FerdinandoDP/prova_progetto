import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { SocialIcon } from 'react-social-icons';
export class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container fluid className="bg-dark">
                <Row className="mt-4" style={{height: '1rem'}}></Row>
                <Row className="text-white" >
                    <Col xs={11.2} md={4} className="mt-2 col_footer_1" >
                        <h5 className="mx-2">
                            Autori progetto:
                        </h5>
                        <p className="mx-2">
                            Ferdinando Di Pasquale<br />
                            Gabriele Cervetti<br />
                            Lorenzo Alighieri
                        </p>
                    </Col>
                    <Col xs={11.2} md={4} className="mt-2 col_footer_2" >
                        <h5 className="mx-2">
                            Contattaci
                        </h5>
                        <p className="mx-2">
                            Ferdinando: email@fasulla.com<br />
                            Gabriele: email@farlocca.com<br />
                            Lorenzo: email@tarocca.com<br />
                        </p>
                    </Col>
                    <Col xs={11.2} md={4}  className="mt-2 col_footer_3" >
                        <h5 className="mx-2">
                            Seguici sui social:
                        </h5>
                        <SocialIcon bgColor="#F8F8FF" url="https://twitter.com" className="mx-1 my-1 social_icon"/>
                        <SocialIcon bgColor="#F8F8FF" url="https://instagram.com" className="mx-1 my-1"/>
                        <SocialIcon bgColor="#F8F8FF" url="https://facebook.com" className="mx-1 my-1"/>
                        <SocialIcon bgColor="#F8F8FF" url="https://github.com" className="mx-1 my-1"/>
                        <SocialIcon bgColor="#F8F8FF" url="https://linkedin.com" className="mx-1 my-1"/>
                    </Col>
                </Row>
                <Row className="mt-4" style={{height: '1rem'}}></Row>
            </Container>
        )
    }
}