// 這份程式碼負責管理待辦清單的新增、完成、刪除，以及資料持久化。
const STORAGE_KEY = 'todo-list-data';

// 取得頁面上的 DOM 節點，方便後續操作。
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const todoCount = document.getElementById('todo-count');

// 先從 localStorage 讀取資料，若沒有資料則使用空陣列。
let todos = loadTodos();

// 儲存待辦資料到 localStorage。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 從 localStorage 讀取待辦資料，並做基本的資料型別檢查。
function loadTodos() {
  const savedTodos = localStorage.getItem(STORAGE_KEY);

  if (!savedTodos) {
    return [];
  }

  try {
    const parsed = JSON.parse(savedTodos);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('讀取待辦資料時發生錯誤:', error);
    return [];
  }
}

// 重新渲染待辦清單，更新空狀態與未完成數量。
function renderTodos() {
  todoList.innerHTML = '';

  if (todos.length === 0) {
    emptyState.classList.add('show');
  } else {
    emptyState.classList.remove('show');
  }

  todos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = `todo-item${todo.completed ? ' completed' : ''}`;

    const leftGroup = document.createElement('div');
    leftGroup.className = 'left-group';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `標記 ${todo.text} 為完成`);

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = '刪除';
    deleteButton.setAttribute('aria-label', `刪除 ${todo.text}`);

    // 將事件綁定在每一個待辦項目上，便於操作。
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    deleteButton.addEventListener('click', () => {
      todos = todos.filter((entry) => entry.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    leftGroup.appendChild(checkbox);
    leftGroup.appendChild(text);
    item.appendChild(leftGroup);
    item.appendChild(deleteButton);
    todoList.appendChild(item);
  });

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  todoCount.textContent = `未完成: ${remainingCount} 項`;
}

// 新增待辦項目，空白內容不會被加入。
function addTodo() {
  const text = todoInput.value.trim();

  if (!text) {
    todoInput.focus();
    return;
  }

  const newTodo = {
    id: Date.now().toString() + Math.random().toString(16).slice(2),
    text,
    completed: false,
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();
  todoInput.value = '';
  todoInput.focus();
}

// 表單提交時觸發新增邏輯。
 todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo();
});

// 頁面首次載入時渲染目前的待辦資料。
renderTodos();
