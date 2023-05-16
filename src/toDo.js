import threedot from './assets/3-dot.svg';

function toDo() {
  const tasks = [
    {
      description: 'Task 1',
      completed: false,
      index: 0,
    },
    {
      description: 'Task 2',
      completed: true,
      index: 1,
    },
    {
      description: 'Task 3',
      completed: false,
      index: 2,
    },
  ];

  // to do list function
  function toDoList() {
    const listContainer = document.querySelector('.to-do-list');

    tasks.forEach((task) => {
      // Create list item element
      const listItem = document.createElement('li');
      listItem.classList.add('list-items');
      listItem.innerHTML = `
      <input class='checkbox' type="checkbox" ${task.completed ? 'checked' : ''}>
      <p class='list-paragraph'>${task.description}</p>
      <img src="${threedot}" alt='#' class='list-img'>
    `;

      // Append list item to the list container
      listContainer.appendChild(listItem);
    });
  }

  toDoList();
}

export default toDo;