import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './custom.css'

import React, {Component} from "react";
import axios from 'axios'

import Input from '../components/input'
import Result from '../components/result'
import Graph from '../components/graph'


const URL = "http://localhost:3003/api/todos"


export default class App extends Component{
    
    constructor(props){
        super(props)
        this.state={ createdAt: '', list: []}
        
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        
        this.refresh()
    }
    
    refresh(){
        axios.get(`${URL}`)
         .then(resp => this.refreshState(resp))
    }
    
    refreshState(resp) {
        return this.setState({ ...this.state, createdAt: '', list: resp.data })
    }
    
    handleAdd(){
        const createdAt = this.state.createdAt
        if (createdAt != ''){
            axios.post(URL, {createdAt}).then(_=> this.refresh())
        }
    }
    
    
    handleRemove(task){
    
        axios.delete(`${URL}/${task.id}`).then(_=> this.refresh()).catch(_=> this.refresh())
    }

    render(){
            return(
                <div className='container'>
                    <h1>Muscular Mass Pointer</h1>

                    <Input action="Height"></Input>
                    <Input action="Waist"></Input>
                    <Input action="Neck"></Input>
                    <Result/>
                    <Graph createdAt={this.state.list}></Graph>
                </div>
             )
}}


/* 

export default class Todo extends Component{

    render(){
        return(
            <div className='Todo' >
                <PageHeader name='Tarefas' small='Cadastro'/>
                <Form handleAdd={this.handleAdd}
                    handleChange={this.handleChange} 
                    description={this.state.description}/>

                <div className="tasks">
                    <AnimationNumber className="tasks" value={this.state.list.length}><strong>Tasks: </strong></AnimationNumber>
                </div>
                
                <List list={this.state.list}
                handleRemove={this.handleRemove}
                handleIsDone={this.handleIsDone}
                />
            </div>
        )
    }
} */
