import React from 'react';
import UserName from './UserName';

const TodoItem = (props) => {
    console.log(props);
    const completedClass = props.completed ? 'todo__item--completed' : '';
    return (
        <div className={`todo__item ${completedClass}`}>
            <p className='todo__title'>{props.title}</p>
            <div className='todo__assignee'>
                <div className='todo__ulabel'>Assigned To:</div>
                <UserName {...props.user} />
            </div>
            <form className="todo_update_form" onSubmit={props.updateHandler}>
                <label>
                    Title:
                <input type="text" name="title" />
                </label>
                <label>
                    Completed:
                <select name="completed">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <label>
                    <input type="submit" value="Update" />
                </label>
            </form>
        </div>
    )

}

export default TodoItem;
