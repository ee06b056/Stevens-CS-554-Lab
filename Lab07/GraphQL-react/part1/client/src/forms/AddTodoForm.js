import React from 'react';
import ApiService from '../ApiService';

class AddTodoForm extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            title: '',
            userName:'',
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        return this.props.submitHandler(this.state);
    }

    render () {
        return (
            <form className="addTodo__form" onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                </label>
                <label>
                    User name:
                    <select name="userName" value={this.state.userName || ''} onChange={this.handleChange}>
                        <option value=''>Select User</option>
                        {
                            this.props.users.map((user, index) => {
                                return <option key={index} value={user.first_name + ' ' + user.last_name}>{user.first_name + ' ' + user.last_name}</option>
                            })
                        }
                    </select>
                </label>
                <label>
                    <input type="submit" value="Submit" />
                </label>
            </form>
        );
    }
}
export default AddTodoForm;