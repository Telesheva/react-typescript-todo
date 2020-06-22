import React, {useEffect, useState} from 'react';
import {TodoForm} from "../components/TodoForm";
import {TodoList} from "../components/TodoList";
import {ITodo} from "../interfaces";

declare var confirm: (question: string) => boolean;

export const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[];
        setTodos(saved);
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    const addTodoHandler = (title: string) => {
        const newTodo: ITodo = {
            title,
            id: Date.now(),
            isCompleted: false
        }
        //setTodos([newTodo, ...todos]); - так как пропсы и стейт в реакте изменяются асинхронно, лучше использовать второ1 вариант
        setTodos(prev => [newTodo, ...prev]);
    }

    const toggleHandler = (id: number) => {
        const filteredTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isCompleted = !todo.isCompleted;
            }
            return todo
        })
        setTodos(filteredTodos);
    }

    const removeHandler = (id: number) => {
        // 1 способ: const shouldRemove = window.confirm('Are you sure to delete this item?');
        //2 способ: через declare var, строка 7
        const shouldRemove = window.confirm('Are you sure to delete this item?');
        if (shouldRemove) {
            setTodos(prev => prev.filter(todo => todo.id !== id))
        }
    }

    return <>
        <TodoForm onAdd={addTodoHandler}/>
        <TodoList todos={todos} onToggle={toggleHandler} onRemove={removeHandler}/>
        </>
}