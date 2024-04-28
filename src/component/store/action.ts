import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  key: React.Key;
  title: string;
  description: string;
  status: string[];
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      const existingTodo = state.todos.find(todo => todo.key === action.payload.key);
      if (!existingTodo) {
        state.todos.push(action.payload);
        saveTodos(state.todos);
      }
    },
    updateTodoStatus: (state, action: PayloadAction<{ key: React.Key; status: string }>) => {
      const todo = state.todos.find(todo => todo.key === action.payload.key);
      if (todo) {
        todo.status = [action.payload.status];
        saveTodos(state.todos);
      }
    },
    deleteTodo: (state, action: PayloadAction<{ key: React.Key }>) => {
      state.todos = state.todos.filter(todo => todo.key !== action.payload.key);
      saveTodos(state.todos);
    },
    loadTodos: (state, action: PayloadAction<Todo[]>) => {
      if (action.payload.length > 0) {
        state.todos = action.payload;
      }
    },
  },
});

export const { addTodo, updateTodoStatus, deleteTodo, loadTodos } = todoSlice.actions;

const STORAGE_KEY = 'ENERHY_TODO_STORAGE';

export const loadTodosFromLocalStorage = () => {
  const todos = localStorage.getItem(STORAGE_KEY);
  return todos ? JSON.parse(todos) : [];
};

export const saveTodos = (todos: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export default todoSlice.reducer;