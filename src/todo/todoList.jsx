import React from 'react'
import IconBtn from '../template/iconButton'

export default props=>{

    const renderRows = _=>{
        var list = props.list || []
        return (
            list.map(task => {
                const isDone=task.done === "false" ? false:true
                const markedAsDone = isDone ? "markedAsDone":''
                return(
                <tr key={task.id}>
                    <td className={markedAsDone}>{task.description}</td>
                    <td>
                        <IconBtn hide={markedAsDone} checkbox={true} checked={isDone}onClick={
                            _=>props.handleIsDone(task, isDone)}>
                        
                        </IconBtn>
                        <IconBtn hide={!markedAsDone} style="danger" onClick={
                            _=> props.handleRemove(task)
                        }>
                            ×
                        </IconBtn>
                    </td>
                </tr>
            )})
        )
    }
    return(
        <table className='table'>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}