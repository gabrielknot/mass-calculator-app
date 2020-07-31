import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './custom.css'

import React, {Component} from "react";

import Input from '../components/input'
import Result from '../components/result'
import Graph from '../components/graph'

export default class App extends Component{
    
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
                    <Result/>
                    <Graph></Graph>
                </div>
             )
}}