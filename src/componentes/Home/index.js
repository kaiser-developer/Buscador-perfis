import React, { Component } from 'react';
import {
    Navbar,
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
    Container,
    Row,
    Col,
    Form,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Spinner,
    Alert
} from 'reactstrap';
import { MdSearch, MdStar } from 'react-icons/md';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    state = {
        carregando: false,
        texto: '',
        corpoCeleste: []
    }

    pesquisarCorpoCeleste = async (evento) => {
        this.setState({ carregando: true });
        evento.preventDefault();
        let corpoCeleste = await axios.get(`https://api.nasa.gov/planetary/apod?date=${this.state.texto.split("/").reverse().join('-')}&api_key=MD59RCghudIV8O7qwh6qmaeXmeZjvMQZl2CHIyb2`);
        setTimeout(() => {
            this.setState({
                corpoCeleste: [corpoCeleste.data, ...this.state.corpoCeleste],
                carregando: false,
            });
        }, 1000);
    }

    render() {
        return (
            <>
                <Navbar color="dark">
                <Container className="d-flex justify-content-start">
                            <img 
                                className="rounded-circle border border-white mr-3"
                                src="https://www.thispersondoesnotexist.com/image"
                                alt="pessoa aleatoria"
                                width="50"
                            />
                            <span className="text-white">
                                Logado como
                                <Link className="text-white font-weight-bold ml-1" to="/" exact>
                                    { this.props.match.params.usuario }
                                </Link>
                            </span>
                    </Container>
                </Navbar>

                <Navbar color="dark" fixed="bottom">
                    <Container className="d-flex justify-content-center">
                        <Col xs="12" md="6">
                            <Form onSubmit={this.pesquisarCorpoCeleste}>
                                <InputGroup>
                                    <Input
                                        type="date"
                                        onChange={evento => this.setState({ texto: evento.target.value })} />
                                    <InputGroupAddon addonType="append">
                                        <Button color="danger">
                                            {this.state.carregando ? (<Spinner color="light" size="sm" />) : <MdSearch size="20px" />}
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Container>
                </Navbar>
                { this.state.corpoCeleste.length === 0 && (
                    <Container className="mt-4 h-100 d-flex flex-column justify-content-center align-items-center">
                        <MdStar color="#000" size="80"/>
                        <Alert color="dark">
                            Digite uma data e veja um corpo celeste relacionado a ela.
                        </Alert>
                    </Container>
                )}

                {this.state.carregando ? (
                    <Container className="mt-4 h-100 d-flex flex-column justify-content-center align-items-center">
                        <Spinner color="dark" size="lg" />
                        <span>Carregando...</span>
                    </Container>
                ) : (
                        <Container className="mt-3 mb-5">
                            <Row>
                                {this.state.corpoCeleste.map((corpo) => (
                                    <Col className="d-flex mb-2" xs="12" md="4">
                                        <Card color="dark" className="text-white">
                                            <CardImg top width="100%" height="35%" src={corpo.hdurl} alt={corpo.title} />
                                            <CardBody>
                                                <CardTitle className="h3 text-primary text-center">{corpo.title}</CardTitle>
                                                <CardSubtitle className="text-muted text-center">{corpo.date.split("-").reverse().join('/')}</CardSubtitle>
                                                <CardText className="text-justify">{corpo.explanation}</CardText>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    )
                }

                {/* {this.state.carregando && (
                    <Container fixed="bottom" className="h-100 d-flex flex-column justify-content-center align-items-center">
                        <Spinner color="dark" size="lg" />
                        <span>Carregando...</span>
                    </Container>
                )} */}
            </>
        );
    }
}