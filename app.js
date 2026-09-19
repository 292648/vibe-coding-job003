// 這份程式碼負責管理待辦清單的新增、完成、刪除、篩選，以及深色模式與資料持久化。
const STORAGE_KEY = 'todo-list-data';
const THEME_STORAGE_KEY = 'todo-theme-preference';

// 取得頁面上的 DOM 節點，方便後續操作。
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const todoCount = document.getElementById('todo-count');
const themeToggleButton = document.getElementById('theme-toggle');
const themeToggleIcon = document.querySelector('.theme-toggle__icon');
const themeToggleLabel = document.querySelector('.theme-toggle__label');
const filterButtons = document.querySelectorAll('.filter-btn');

// 先從 localStorage 讀取資料，若沒有資料則使用空陣列。
let todos = loadTodos();
let currentFilter = 'all';

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

// 取得系統的深淺色設定，作為未手動選擇時的預設。
function getSystemTheme() {
  if (!window.matchMedia) {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// 依照指定主題更新 HTML 的 data-theme 屬性與切換按鈕文字。
function applyTheme(theme) {
  const resolvedTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', resolvedTheme);

  const isDark = resolvedTheme === 'dark';
  themeToggleButton.setAttribute('aria-pressed', String(isDark));
  themeToggleButton.setAttribute('aria-label', isDark ? '切換為淺色模式' : '切換為深色模式');
  themeToggleIcon.textContent = isDark ? '☀️' : '🌙';
  themeToggleLabel.textContent = isDark ? '淺色模式' : '深色模式';
}

// 初始化主題：若使用者已手動存過偏好，就維持；否則跟隨作業系統設定。
function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const theme = savedTheme || getSystemTheme();

  applyTheme(theme);

  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (event) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(event.matches ? 'dark' : 'light');
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleThemeChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleThemeChange);
    }
  }
}

// 取得目前篩選條件下應顯示的待辦項目。
function getVisibleTodos() {
  if (currentFilter === 'active') {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === 'completed') {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

// 更新篩選按鈕的選取狀態。
function updateFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

// 重新渲染待辦清單，更新空狀態與未完成數量。
function renderTodos() {
  const visibleTodos = getVisibleTodos();
  todoList.innerHTML = '';

  if (todos.length === 0) {
    emptyState.textContent = '還沒有任何待辦事項,新增一個吧!';
    emptyState.classList.add('show');
  } else if (visibleTodos.length === 0) {
    emptyState.classList.add('show');

    if (currentFilter === 'active') {
      emptyState.textContent = '目前沒有未完成的待辦事項。已完成的項目已被篩選隱藏。';
    } else if (currentFilter === 'completed') {
      emptyState.textContent = '目前沒有已完成的待辦事項。已取消勾選的項目已從這個篩選中移出。';
    } else {
      emptyState.textContent = '沒有符合條件的待辦事項。';
    }
  } else {
    emptyState.classList.remove('show');
  }

  visibleTodos.forEach((todo) => {
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

// 點選主題切換按鈕時，更新主題並永續保存使用者選擇。
themeToggleButton.addEventListener('click', () => {
  const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
});

// 點選篩選按鈕時，切換目前篩選條件並重新渲染。
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    updateFilterButtons();
    renderTodos();
  });
});

// 表單提交時觸發新增邏輯。
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo();
});

// 頁面首次載入時初始化主題並渲染目前的待辦資料。
initializeTheme();
updateFilterButtons();
renderTodos();
