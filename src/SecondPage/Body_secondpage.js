import React from 'react';

import history from '../history';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { InputGroup } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

export class Body_secondpage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            articles: [],
            comments: [],
            initialized_article: false,
            initialized_comments: false,
            changed: false
        }
        this.loading=this.loading.bind(this);
        this.get_id=this.get_id.bind(this);
        this.routeChange=this.routeChange.bind(this);
        this.init=this.init.bind(this);
        this.addCard=this.addCard.bind(this);
        this.initialized_articles=this.initialized_articles.bind(this);
        this.find_article=this.find_article.bind(this);
        this.add_tag=this.add_tag.bind(this);
        this.show_tags=this.show_tags.bind(this);
        this.show_article=this.show_article.bind(this);
        this.show_comment=this.show_comment.bind(this);
        this.show_all_comments=this.show_all_comments.bind(this);
        this.add_comment=this.add_comment.bind(this);
        this.find_and_update=this.find_and_update.bind(this);
    }
    
    loading(){
        if(this.state.initialized_article===false){
            return(
                <Spinner animation="border" variant="light" className=" my-2 mx-2 "/>
            )
        }
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
        <Col  className="justify-content-center " key={article._id}>
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

    find_and_update(id_comment){
        if(this.state.initialized_article===true){
            var found=false;
            var i=0;
            while(i<this.state.articles.length && found===false){
                if(this.state.articles[i]._id === this.get_id()){
                    this.setState(state=>{state.articles[i].comments.push(id_comment)});
                    
                    found=true;
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

    show_comment(id_comment){
        var i=0;
        var found=false;
        while(i<this.state.comments.length && found===false){
            if(this.state.comments[i]._id===id_comment){
                found=true;
                return (
                <ListGroup.Item variant="light" className="text-left" key={id_comment}>Autore: {this.state.comments[i].author} <br/> Messaggio: {this.state.comments[i].body}</ListGroup.Item>
                )
            }
            i++;
        }
    }

    show_all_comments(art){
        var array=new Array();
        for(var i=0;i<art.comments.length;i++){
            
            array.push(this.show_comment(art.comments[i]));
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
                <InputGroup className="mt-2">
                    <FormControl placeholder="Inserisci un commento" ref={ref=>{this.myInput=ref}} />
                    <InputGroup.Append>
                        <Button variant="outline-light" onClick={()=>{this.add_comment()}}>Invia</Button>
                    </InputGroup.Append>
                </InputGroup>
                    <p className="text-left mt-1">Commenti: </p>
                <ListGroup className="mt-1 mb-4">
                    {this.show_all_comments(art)}
                </ListGroup>
                
            </Col>
            )
        }
        
    }

    add_comment(){
        var new_comment="";
        var comment={
            body: this.myInput.value,
            article: this.get_id()
        }
        this.myInput.value="";
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        };
        fetch('https://obscure-everglades-58254.herokuapp.com/comments', requestOptions).then(response => response.json())
        .then(res=>{this.setState(state=> {state.comments.push(res)})})
        .then(()=>new_comment=this.state.comments[this.state.comments.length-1])
        .then(()=>{
            var art=this.find_article()
            var comm={
                comments: art.comments
            }
            comm.comments.push(new_comment._id)
            console.log(comm)
            const request2Options = {
             method: 'PATCH',
             headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({comments: comm.comments})
            };
            fetch('https://obscure-everglades-58254.herokuapp.com/articles/'+this.get_id() , request2Options).then(res=>res.json()).then(res=>console.log(res)).then(()=>window.location.reload(false));
            });
        
    }

    init(){
      //  fetch('http://localhost:4000/articles').then(res=>res.json()).then(res=>this.setState({articles: res})).then(()=>this.setState({initialized_article: true})).then(()=>console.log(this.state.articles));
      //  fetch('http://localhost:4000/comments').then(res=>res.json()).then(res=>this.setState({comments: res})).then(()=>this.setState({initialized_comments: true})).then(()=>console.log(this.state.articles));
      fetch('https://obscure-everglades-58254.herokuapp.com/articles').then(res=>res.json()).then(res=>this.setState({articles: res})).then(()=>this.setState({initialized_article: true})).then(()=>console.log(this.state.articles));
      fetch('https://obscure-everglades-58254.herokuapp.com/comments').then(res=>res.json()).then(res=>this.setState({comments: res})).then(()=>this.setState({initialized_comments: true})).then(()=>console.log(this.state.articles));
    }

    componentDidMount(){
        this.init();
    }

    render(){
        return(
            <Container fluid>
            <Row className="mt-3 mb-2 mx-2 article_page bg-dark ">
                {this.loading()}
                {this.show_article()}
            </Row>
            <Row>
                 <Col>
                    <h2>
                        <Badge variant="dark" className="mx-2 my_badge">Altri articoli..</Badge>
                    </h2>
                 </Col>
            </Row>
            <Row className="my-2 mx-2 cards_section d-flex flex-row flex-nowrap" style={{border:'solid 1px black', overflow: "hidden", overflowX: "auto"}}>
                  {this.initialized_articles()}
            </Row>
            </Container>
        )
    }
}
