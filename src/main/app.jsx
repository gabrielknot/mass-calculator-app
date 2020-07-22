import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './custom.css'

import React, {Component} from "react";

import Input from '../components/input'

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
                        height:0.0,
                        waist:0.0,
                        neck_size:0.0,
                        female: false
                    }
    }
    /* 
    
        Homens
    495/(1.0324-.19077(log(cintura-pescoço))+.15456(log(altura)))-450 

        Mulheres
     495/(1.29579-.35004(log(cintura+quadril-pescoço))+.22100(log(altura)))-450 
     
     (logaritmos em base 10)
    */


    render(){
            return(
                <div className='container'>
                    <h1>Muscular Mass Pointer</h1>

                    <Input action="Height"></Input>
                    <Input action="Waist"></Input>
                    <Input action="Neck"></Input>

                </div>
             )
}}