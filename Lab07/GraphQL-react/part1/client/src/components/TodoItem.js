import React from 'react';
import UserName from './UserName';

class TodoItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            completed: this.props.completed
        }
        console.log(this.state);
    }

    handleChange = (event) => {
        console.log(event.target.value, typeof event.target.value);
        if (event.target.name == 'completed') {
            const value = event.target.value == 'true' ? true : false;
            this.setState({[event.target.name]: value});
        } else {

            this.setState({[event.target.name]: event.target.value});
        }
        console.log(this.state);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("thisstate: ", this.state);
        this.props.updateHandler(this.state);
    }

    handleDelete = (event) => {
        event.preventDefault();
        this.props.deleteHandler({id:this.props.id});
    }

    render() {
        const completedClass = this.props.completed ? 'todo__item--completed' : '';
        return (
            <div className={`todo__item ${completedClass}`}>
                <p className='todo__title'>{this.props.title}</p>
                <div className='todo__assignee'>
                    <div className='todo__ulabel'>Assigned To:</div>
                    <UserName {...this.props.user} />
                </div>
                <form className="todo_update_form" onSubmit={this.handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    </label>
                    <label>
                        Completed:
                        <select name="completed" value={this.state.completed} onChange={this.handleChange}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </label>
                    <label>
                        <input type="submit" value="Update" />
                    </label>
                </form>
                <button onClick={this.handleDelete}>
                    Delete
                </button>
            </div>
        )
    }
}

export default TodoItem;