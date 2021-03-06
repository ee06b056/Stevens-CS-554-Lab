import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {

    updateHandler = (params) => {
        this.props.updateHandler(params);
    }

    deleteHandler = (params) => {
        this.props.deleteHandler(params);
    }

    render () {
        if(!this.props.todos.length) {
            return null;
        }
        return <div className="todo__list">
            {
                this.props.todos.map((item, index) => {
                    return <TodoItem key={index} updateHandler={this.updateHandler} deleteHandler={this.deleteHandler} {...item} />;
                })
            }
        </div>
    }
}

export default TodoList
