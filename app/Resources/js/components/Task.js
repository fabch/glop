var React = require('react');
var TaskActions = require('../actions/TaskActions');
var TaskStore = require('../stores/TaskStore');

var Task = React.createClass({
    getInitialState: function() {
        return {
            task: this.props.task
        };
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return (
            nextProps.todo !== this.props.task ||
            nextState.task !== this.state.task
        );
    },

    componentDidUpdate: function (prevProps) {
        if (!prevProps.task && this.props.task) {
            var node = React.findDOMNode(this.refs.editField);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    },

    render: function() {
        return (
            <li>{this.props.task.text}
                <button onClick={this.props.onDestroy} value="x" />
            </li>
        );
    }
});

var Tasks = React.createClass({
    getInitialState() {
        return TaskStore.getState();
    },

    componentDidMount() {
        TaskStore.listen(this.onChange);
        TaskActions.fetchTasks();
    },

    componentWillUnmount() {
        TaskStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    destroy: function(task) {
        TaskActions.destroyTask(task);
    },

    add: function(task) {
        console.log(task);
        TaskActions.addTask(task);
    },

    render() {
        if (this.state.errorMessage) {
            return (
                <div>Something is wrong</div>
            );
        }

        if (!this.state.tasks.length) {
            return (
                <div>
                    <p>...</p>
                </div>
            )
        }

        return (
            <ul>
                {this.state.tasks.map((task) => {
                    return (
                        <Task
                            key={task.id}
                            task={task}
                            onDestroy={this.destroy.bind(this,task)}
                        />
                    );
                })}
                <li>
                    <input
                        ref="newField"
                        className="new-todo"
                        placeholder="What needs to be done?"
                        value={this.state.newTodo}
                        onKeyDown={this.handleNewTodoKeyDown}
                        onChange={this.handleChange}
                        autoFocus={true}
                        />
                </li>
            </ul>
        );
    }
});
module.exports = Tasks;