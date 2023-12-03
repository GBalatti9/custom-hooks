import { useEffect, useReducer } from "react";
import { todoReducer } from "../useReducer/todoReducer";

const ACTIONS = {
    ADD_TODO: '[TODO] Add Todo',
    REMOVE_TODO: '[TODO] Remove Todo',
    TOGGLE_TODO: '[TODO] Toggle Todo',
}
export const useTodo = () => {


    const initialState = [];

    const init = () => {
        return JSON.parse( localStorage.getItem('todos') ) || [];
    }

    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init );

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ) );
    }, [todos])
    

    const onAddNewTodo = ( newTodo ) => {

        const { description } = newTodo;

        const alreadyExists = todos.some(( todo ) => description.toLowerCase() === todo.description.toLowerCase() );

        console.log({ alreadyExists });

        if( !alreadyExists ){
            const action = {
                type: ACTIONS.ADD_TODO,
                payload: newTodo
            }
    
            dispatch( action );
            console.log({ newTodo });
        }

    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: ACTIONS.REMOVE_TODO,
            payload: id
        })
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: ACTIONS.TOGGLE_TODO,
            payload: id
        })
    }

    return { 
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done).length ,
        onAddNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }

}
