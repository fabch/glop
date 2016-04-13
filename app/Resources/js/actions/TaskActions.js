var alt = require('../alt');
var TaskSource = require('../sources/TaskSource');

class TaskActions {

    updateTasks(tasks) {
        return tasks;
    }

    removeTask(task) {
        return task;
    }

    fetchTasks() {
        return (dispatch) => {
            dispatch();
            fetch('/web/app_dev.php/api/tasks.json')
                .then((response) => {
                    console.log(response);
                    response.json()
                })
                .then((response) => {
                    this.updateTasks(response);
                })
                .catch((error) => {
                    this.tasksFailed(error);
                });
        }
    }

    destroyTask(task) {
        return (dispatch) => {
            dispatch();
            fetch('/web/app_dev.php/api/tasks/' + task.id + '.json', { method: 'delete' })
                .then((response) => {
                    this.removeTask(task);
                })
                .catch((error) => {
                    this.tasksFailed(error);
                });
        }
    }

    tasksFailed(errorMessage) {
        return errorMessage;
    }
}

module.exports = alt.createActions(TaskActions);