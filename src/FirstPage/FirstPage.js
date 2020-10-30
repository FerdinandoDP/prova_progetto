import React from 'react';
import MyNavbar from '../layout/Navbar';
import {Body_firstpage} from './Body_firstpage';

export class FirstPage extends React.Component{
    render(){
        return(
            <>
                <MyNavbar />
                <Body_firstpage />
            </>
        )
    }
}