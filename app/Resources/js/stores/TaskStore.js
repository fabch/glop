var alt = require('../alt');
var TaskActions = require('../actions/TaskActions');

class TaskStore {

    constructor() {
        this.tasks = [];
        this.errorMessage = null;
        this.bindListeners({
            handleUpdateTasks: TaskActions.UPDATE_TASKS,
            handleFetchTasks: TaskActions.FETCH_TASKS,
            handleRemoveTask: TaskActions.REMOVE_TASK,
            handleTasksFailed: TaskActions.TASKS_FAILED
        });
    }

    handleUpdateTasks(tasks) {
        console.log('TaskStore.handleUpdateTasks',tasks);
        this.tasks = tasks;
        this.errorMessage = null;
    }

    handleFetchTasks() {
        console.log('TaskStore.handleFetchTasks');
        // reset the array while we're fetching new locations so React can
        // be smart and render a spinner for us since the data is empty.
        this.tasks = [];
    }

    handleRemoveTask(taskToDestroy) {
        console.log('TaskStore.handleDestroyTask',taskToDestroy);
        this.tasks = this.tasks.filter(function (task) {
            return task !== taskToDestroy;
        });
    }

    handleTasksFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

module.exports = alt.createStore(TaskStore, 'TaskStore');