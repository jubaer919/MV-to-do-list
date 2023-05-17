import threedot from './assets/3-dot.svg';
import deleteIcons from './assets/delete.svg';

export default class Todo {
  constructor() {
    this.list = [];
    this.listInput = document.querySelector('.input');
    this.removeCompletedTask = document.querySelector('.btn');
    this.toDoList = document.querySelector('.to-do-list');

    // load the list from the local storage
    if (localStorage.getItem('list')) {
      this.list = JSON.parse(localStorage.getItem('list'));
      this.renderList();
    }

    // add listener to the buttons
    this.listInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        const taskName = this.listInput.value;
        this.addTask(taskName);
        localStorage.setItem('list', JSON.stringify(this.list));
        this.listInput.value = '';
      }
    });

    this.toDoList.addEventListener('click', (event) => {
      if (event.target.tagName === 'IMG' && event.target.classList.contains('list-img')) {
        const listItem = event.target.closest('li');
        const editIcon = listItem.querySelector('.list-img');
        const deleteIcon = listItem.querySelector('.delete-icon');
        const textElement = listItem.querySelector('.list-paragraph');

        // enable editing option
        textElement.contentEditable = true;
        textElement.focus();

        // replace edit icon with delete icon
        editIcon.style.display = 'none';
        deleteIcon.style.display = 'inline-block';

        event.target.src = deleteIcons;

        // add event listener to delete icon
        deleteIcon.addEventListener('click', () => {
          const index = Array.from(this.toDoList.children).indexOf(listItem);
          this.removeListItem(index);
          localStorage.setItem('list', JSON.stringify(this.list));
        });
      }
    });

    this.toDoList.addEventListener('keyup', (event) => {
      if (event.target.classList.contains('list-paragraph') && event.key === 'Enter') {
        const listItem = event.target.closest('li');
        const index = Array.from(this.toDoList.children).indexOf(listItem);
        const taskName = event.target.innerText.trim();
        this.updateTask(index, taskName);
        localStorage.setItem('list', JSON.stringify(this.list));
      }
    });
  }

  removeListItem(index) {
    this.list.splice(index, 1);
    this.renderList();
  }

  updateTask(index, taskName) {
    if (taskName) {
      this.list[index].taskName = taskName;
      this.renderList();
    }
  }

  renderList() {
    this.toDoList.innerHTML = '';
    this.list.forEach((list, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-items');
      listItem.innerHTML = `
      <input class='checkbox' type="checkbox">
      <p class='list-paragraph' contenteditable="true">${list.taskName}</p>
      <img src=${threedot} alt="#" data-index="${index}" class='list-img'>
      <img src=${deleteIcons} alt="Delete" class="delete-icon">
      `;
      this.toDoList.appendChild(listItem);
    });
  }

  addTask(taskName) {
    taskName = taskName.trim();

    if (!taskName) {
      return;
    }

    const newTask = { taskName };
    this.list.push(newTask);
    this.renderList();
  }
}
