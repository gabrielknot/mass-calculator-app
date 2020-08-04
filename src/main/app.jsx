import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './custom.css'

import React, {Component, Suspense} from "react";
import ReactLoading from 'react-loading'
import axios from 'axios'

import Input from '../components/input'
import Result from '../components/result'
const GraphRegister = React.lazy(()=> import ('../components/graphs/graph_registers'))


const URL_registers = "http://localhost:3003/api/todos"
const URL_groups = "http://localhost:3003/api/groups"


export default class App extends Component{
    
    constructor(props){
        super(props)
        this.state={ groups: [], registers: []}
        
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        
        this.refresh()
    }
    
    refresh(){
        axios.get(`${URL_registers}`)
         .then(resp => this.refreshState(URL_registers,resp))
        axios.get(`${URL_groups}`)
            .then(resp => this.refreshState(URL_groups,resp))
    }
    
    refreshState(URL,resp) {
        if (URL === URL_registers){
            return this.setState({ ...this.state, registers: resp.data })
        }else{
            if(URL=== URL_groups){
                return this.setState({ ...this.state, groups: resp.data })
            }
        }
    }
    
    handleAdd(){
        const groups = this.state.groups
        if (groups != ''){
            axios.post(URL_registers, {groups}).then(_=> this.refresh())
        }
    }
    
    
    handleRemove(task){
    
        axios.delete(`${URL_registers}/${task.id}`).then(_=> this.refresh()).catch(_=> this.refresh())
    }

    render(){
            return(
                <div className='container'>
                    <h1>Muscular Mass Pointer</h1>

                    <Suspense fallback={<ReactLoading color="#000"/>}>
                        <Input action="Height"></Input>
                        <Input action="Waist"></Input>
                        <Input action="Neck"></Input>
                        <Result/>
                    </Suspense>

                    <Suspense  fallback={<ReactLoading color="#000"/>}>
                        <GraphRegister priority={""+Date.now.getMonth} groups={this.state.groups} createdAt={this.state.registers}></GraphRegister>
                    </Suspense>

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
