import React, {Component} from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import Form from './todoForm'
import List from './todoList'
import AnimationNumber from "../template/animationNumber"

const URL = "http://localhost:3003/api/todos"

export default class Todo extends Component{
    constructor(props){
        super(props)
        this.state={ description: '', list: []}
        
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleIsDone = this.handleIsDone.bind(this)
        
        this.refresh()
    }

    refresh(){
        axios.get(`${URL}`)
         .then(resp => this.refreshState(resp))
    }

    refreshState(resp) {
        return this.setState({ ...this.state, description: '', list: resp.data })
    }

    handleAdd(){
        const description = this.state.description
        if (description != ''){
            axios.post(URL, {description}).then(_=> this.refresh())
        }
    }
    
    handleChange(e){
        this.setState({ ...this.state, description: e.target.value })
    }

/*     handleInputChange(task){
        const isDone = task.done === "false" ? "true" : "false"
        axios.put(`${URL}/${task.id}`, {...task, done: isDone}).then(_=> this.refresh()).catch(_=> this.refresh())
    } */
    handleIsDone(task, bool){
        const isDone = bool ? "false" : "true"
        
        axios.put(`${URL}/${task.id}`, {...task, done: isDone}).then(_=> this.refresh()).catch(_=> this.refresh())
    }
    handleRemove(task){

        axios.delete(`${URL}/${task.id}`).then(_=> this.refresh()).catch(_=> this.refresh())
    }

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
}