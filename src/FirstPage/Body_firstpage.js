import React from 'react';

import history from '../history';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

export class Body_firstpage extends React.Component{
    constructor(props){
        super(props);
        this.state={articles: [],
                    initialized: false};
        this.init=this.init.bind(this);
        this.addCard=this.addCard.bind(this);
        this.initialized_articles=this.initialized_articles.bind(this);
        this.routeChange=this.routeChange.bind(this);
    }

    routeChange(article){
        let path= '/articles/?_id='+ article._id ;
        history.push(path);
       
    }

    addCard(article,featured){
        if(this.state.initialized===true && article.featured===featured && article.draft===false){
        return (
        <Col md={3} className="justify-content-center " key={article._id}>
        <Card style={{ width: '16rem', height: '20rem'}} className="bg-dark text-white mx-2 mt-2 mb-3 card_p">
            <Card.Img variant="top" src={article.img} style={{ height: '150px'}}/>
            <Card.Body>
                <Card.Title>
                    {article.title}
                </Card.Title>
                
                <p className="text-truncate" >
                    {article.subtitle}<br/>
                    numero commenti: {article.comments.length} 
                </p>   
                   
            </Card.Body>
            <Card.Footer>
                <Button variant="light" onClick={()=>this.routeChange(article)}>Leggi di più</Button>
            </Card.Footer>
        </Card>
        </Col>)}
    }

    initialized_articles(featured){
        if(this.state.initialized===true){
            var array=new Array();
           for(var i=0;i<this.state.articles.length;i++){
                array.push(this.addCard(this.state.articles[i], featured));
           } 
           return array;
        }
    }

    init(){
        fetch('http://localhost:4000/articles').then(res=>res.json()).then(res=>this.setState({articles: res})).then(()=>this.setState({initialized: true})).then(()=>console.log(this.state.articles));
    }

    componentDidMount(){
       this.init();
    }
  
    render(){
        return(
            <Container fluid>
             <Row className="justify-content-center" >
                <Col xs={2} md={5}></Col>
                 <Col xs={5} md={5} className="text-align-center"> <h1 className="">ARTICOLI</h1></Col>
                <Col md={2}></Col>
             </Row>
             <Row >
                 <Col>
                    <h2>
                        <Badge variant="dark" className="mx-2 my_badge">In Primo Piano</Badge>
                    </h2>
                 </Col>
             </Row>
              <Row className="my-2 mx-2 justify-content-md-center cards_section d-flex flex-row flex-nowrap" style={{border:'solid 1px black', overflow: "hidden", overflowX: "auto"}}>
                 {this.initialized_articles(true)}   
              </Row>
              <Row>
                 <Col>
                    <h2>
                        <Badge variant="dark" className="mx-2 my_badge">Altri articoli..</Badge>
                    </h2>
                 </Col>
             </Row>
              <Row className="my-2 mx-2 justify-content-md-center cards_section d-flex flex-row flex-nowrap" style={{border:'solid 1px black', overflow: "hidden", overflowX: "auto"}}>
                  {this.initialized_articles(false)}
              </Row>
            </Container>
        )

    };
}
