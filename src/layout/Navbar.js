import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {withRouter} from 'react-router';

 class MyNavbar extends React.Component{
    constructor(props){
      super(props);
      this.state={
        articles: [],
        initialized: false,
        MyPath: '/'
      }
      this.init=this.init.bind(this);
      this.addNavbarItem=this.addNavbarItem.bind(this);
      this.inizializedNavbarItem=this.inizializedNavbarItem.bind(this);
      this.get_id=this.get_id.bind(this);
     
    
    }

    

    get_id(){
      var path=window.location.href;
      var array=path.split('/');
      if(array.length<6){
       
        return '/';
        
      }else{
       var query=array[5];
       var id_arr=query.split('?_id=');
       var id=id_arr[1];
      
        return '?_id='+id
        
      }
      
  }

    init(){
      fetch('http://localhost:4000/articles').then(res=>res.json()).then(res=>this.setState({articles: res})).then(()=>this.setState({initialized: true})).then(()=>console.log(this.state.initialized));
    }

    componentDidMount(){
      this.init();
      console.log('a');
    }

    addNavbarItem(article){
      if(article.draft===false){
        return(
        <NavDropdown.Item href={"#articles/?_id="+article._id} key={article.title} eventKey={"?_id=" + article._id} >{article.title}</NavDropdown.Item>
        )
      }
    }

    inizializedNavbarItem(){
    
      if(this.state.initialized===true){
        var array=new Array();
        for(var i=0;i<this.state.articles.length;i++){
            array.push(this.addNavbarItem(this.state.articles[i]));
        }
        
        return array;
      }
      
    }


    render(){
        return(
        
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" > 
          <Navbar.Brand >Il mio Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" activeKey={this.get_id()}>
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Articoli" id="collasible-nav-dropdown" >
              {this.inizializedNavbarItem()}
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        )
    }
}

export default withRouter(MyNavbar);
