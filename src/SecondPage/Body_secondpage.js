import React from 'react';

import history from '../history';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import {Link} from 'react-router-dom';

export class Body_secondpage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            articles: [],
            comments: [],
            initialized_article: false,
            initialized_comments: false
        }
        this.get_id=this.get_id.bind(this);
        this.routeChange=this.routeChange.bind(this);
        this.init=this.init.bind(this);
        this.addCard=this.addCard.bind(this);
        this.initialized_articles=this.initialized_articles.bind(this);
        this.find_article=this.find_article.bind(this);
        this.add_tag=this.add_tag.bind(this);
        this.show_tags=this.show_tags.bind(this);
        this.show_article=this.show_article.bind(this);
    }
    
    get_id(){
        var path=window.location.href;
        var array=path.split('/');
        var query=array[5];
        var id_arr=query.split('?_id=');
        var id=id_arr[1];
        return(id);
    }

    routeChange(article){
        let path= '/articles/?_id='+ article._id ;
        history.push(path);
    }

    addCard(article, featured){
        if(this.state.initialized_article===true && article.featured===featured && article.draft===false && article._id != this.get_id()){
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

    initialized_articles(){
        if(this.state.initialized_article===true){
            var array=new Array();
           for(var i=0;i<this.state.articles.length;i++){
                array.push(this.addCard(this.state.articles[i], true));
           } 
           for(var i=0;i<this.state.articles.length;i++){
                 array.push(this.addCard(this.state.articles[i], false));
           } 
           return array;
        }
    }

    find_article(){
        if(this.state.initialized_article===true){
            var found=false;
            var i=0;
            while(i<this.state.articles.length && found===false){
                if(this.state.articles[i]._id === this.get_id()){
                    return this.state.articles[i];
                }
                i++;
            }
        }
    }

    add_tag(tag){
        return(
            <Badge variant="light" className="my-2 mr-1 col_badge"  key={tag}>{tag}</Badge>
        )
    }

    show_tags(article){
        var array=new Array();
        for(var i=0;i<article.tags.length;i++){
            array.push(this.add_tag(article.tags[i]));
        }
        return array;
    }

    show_article(){
        console.log(this.initialized_comments);
        
        if(this.state.initialized_article===true && this.state.initialized_comments===true){
            console.log('b');
            var art=this.find_article();
            return(
            <Col className="col_page text-center">
                <h1>{art.title}</h1>
                <h2 className="my-3">{art.subtitle}</h2>
                <img className="my-4" src={art.img}/>
                <p className="text-left">{art.body}<br /><br />tags:</p>  
                <h4 className="text-left">{this.show_tags(art)}</h4>  
            </Col>
            )
        }
        
    }

    init(){
        fetch('http://localhost:4000/articles').then(res=>res.json()).then(res=>this.setState({articles: res})).then(()=>this.setState({initialized_article: true})).then(()=>console.log(this.state.articles));
        fetch('http://localhost:4000/comments').then(res=>res.json()).then(res=>this.setState({comments: res})).then(()=>this.setState({initialized_comments: true})).then(()=>console.log(this.state.articles));
    }

    componentDidMount(){
        this.init();
    }

    render(){
        return(
            <Container fluid>
            <Row className="mt-3 mb-2 mx-2 article_page bg-dark ">
                {this.show_article()}
            </Row>
            <Row>
                 <Col>
                    <h2>
                        <Badge variant="dark" className="mx-2 my_badge">Altri articoli..</Badge>
                    </h2>
                 </Col>
            </Row>
            <Row className="my-2 mx-2 justify-content-md-center cards_section d-flex flex-row flex-nowrap" style={{border:'solid 1px black', overflow: "hidden", overflowX: "auto"}}>
                  {this.initialized_articles()}
            </Row>
            </Container>
        )
    }
}
