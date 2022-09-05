import { v4 as uuidV4 } from 'uuid';

//console.log(uuidV4());

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const tasks: Task[] = loadTasks();

tasks.forEach(addListItem);

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};
form?.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();
  if (input?.value == '' || input?.value == null) return;

  const task: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  addListItem(task);
  tasks.push(task);
  saveTasks();
  input.value = '';
  //saveTask to local storage
});

function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  });

  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('TASKS');
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
