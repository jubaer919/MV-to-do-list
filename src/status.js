export function setTaskCompletedStatus(index, completed) {
  const task = this.list[index];
  if (task) {
    task.completed = completed;
    this.renderList();
    this.saveListToLocalStorage();
  }
}

// Check if a task is completed
export function isTaskCompleted(index) {
  const task = this.list[index];
  return task ? task.completed : false;
}

// Clear all completed tasks
export function clearCompletedTasks() {
  this.list = this.list.filter((task) => !task.completed);
  this.updateIndexes();
  this.renderList();
  this.saveListToLocalStorage();
}