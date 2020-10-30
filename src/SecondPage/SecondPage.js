import React from 'react';
import MyNavbar from '../layout/Navbar';
import {Body_secondpage} from './Body_secondpage';

export class SecondPage extends React.Component{
    render(){
        return(
            <>
                <MyNavbar />
                <Body_secondpage />
            </>
        )
    }
}