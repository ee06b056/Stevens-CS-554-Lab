import Users from './data/users';
import Todos from './data/todos';
import find from 'lodash/find';
import filter from 'lodash/filter';
import remove from 'lodash/remove';
import sumBy from 'lodash/sumBy';
import {
    GraphQLInt,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLID
} from 'graphql';
import uuidv1 from 'uuid/v1';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Users in company',
    fields: () => ({
            id: {type: new GraphQLNonNull(GraphQLInt)},
            first_name: {type: new GraphQLNonNull(GraphQLString)},
            last_name: {type: new GraphQLNonNull(GraphQLString)},
            email: {type: GraphQLString},
            gender: {type: GraphQLString},
            department: {type: new GraphQLNonNull(GraphQLString)},
            country: {type: new GraphQLNonNull(GraphQLString)},
            todo_count: {
                type: GraphQLInt,
                resolve: (user) => {
                    return sumBy(Todos, todo => todo.userId === user.id ? 1:0);
                }
            },
            todos: {
                type: new GraphQLList(TodoType),
                resolve: (user, args) => {
                    return filter(Todos, todo => todo.userId === user.id);
                }
            }
        })
});

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    description: 'Task for user',
    fields: () => ({
            id: {type: new GraphQLNonNull(GraphQLID)},
            title: {type: GraphQLString},
            completed: {type: new GraphQLNonNull(GraphQLBoolean)},
            user: {
                type: UserType,
                resolve: (todo, args) => {
                    return find(Users, user => user.id === todo.userId);
                }
            }
        })
});

const TodoQueryRootType = new GraphQLObjectType({
    name: 'TodoAppSchema',
    description: 'Root Todo App Schema',
    fields: () => ({
            users: {
                args: {
                    first_name: {type: GraphQLString},
                    last_name: {type: GraphQLString},
                    department: {type: GraphQLString},
                    country: {type: GraphQLString},
                },
                type: new GraphQLList(UserType),
                description: 'List of Users',
                resolve: (parent, args) => {
                    if (Object.keys(args).length) {
                        return filter(Users, args);
                    }
                    return Users;
                }
            },
            todos: {
                args: {
                    userId: {type: GraphQLInt},
                    completed: {type: GraphQLBoolean},
                },
                type: new GraphQLList(TodoType),
                description: 'List of Todos',
                resolve: (parent, args) => {
                    if (Object.keys(args).length) {
                        return filter(Todos, args);
                    }
                    return Todos;
                }
            }
        })
});

const TodoMutation = new GraphQLObjectType({
    name: 'TodoMutationSchema',
    fields: {
        addTodo: {
            type: TodoType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                userName: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                const [first_name, last_name] = args.userName.split(' ');
                const newTodo = {
                    id: uuidv1(),
                    title: args.title,
                    completed: false,
                    userId: find(Users, {first_name, last_name}).id
                };
                Todos.push(newTodo);
                return newTodo;
            }
        },
        uppdateTodo: {
            type: TodoType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                completed: {type: new GraphQLNonNull(GraphQLBoolean)}
            },
            resolve: (parent, args) => {
                if (!isNaN(parseInt(args.id))) {
                    args.id = parseInt(args.id);
                }
                const todo = find(Todos, {id: args.id});
                todo.title = args.title;
                todo.completed = args.completed;
                return todo;
            }
        },
        deleteTodo: {
            type: TodoType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve: (parent, args) => {
                if (!isNaN(parseInt(args.id))) {
                    args.id = parseInt(args.id);
                }
                return remove(Todos, args)[0];
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: TodoQueryRootType,
    mutation: TodoMutation
});

export default schema;
