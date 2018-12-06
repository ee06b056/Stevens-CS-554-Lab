import React from 'react';
import ApiService from '../ApiService';
import UserList from '../components/UserList';
import UserForm from '../forms/UserForm';
import AddTodoForm from '../forms/AddTodoForm';

class UserListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
        this.search = this.search.bind(this);
    }
    
    async componentDidMount () {
        await this.search();
    }

    async search(params) {
        try {
            const users = await ApiService.getUsers(params);
            this.setState({users});
        } catch (e) {
            console.error(`An error ${e.message} occured while searching users`);
        }
    }

    addTodo = async (params) => {
        try {
            await ApiService.addTodo(params);
            await this.search();
        } catch (e) {
            console.log(`An error ${e.message} occured while adding todo`);
        }
    }

    render() {
        return <div className="user">
            <UserForm submitHandler={this.search} />
            <AddTodoForm submitHandler={this.addTodo} users={this.state.users} />
            <UserList users={this.state.users} />
        </div>;
    }

}

export default UserListContainer;