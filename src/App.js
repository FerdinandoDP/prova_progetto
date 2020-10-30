import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Footer} from './layout/Footer';
import MyNavbar from './layout/Navbar';
import {Routes} from './Routes';

export default class Prova extends React.Component{
  constructor(props){
      super(props);
  }

  render(){
    
    return(
      <>
        <MyNavbar />
        <Routes />
        <Footer/>
      </>
    )
  }
};
