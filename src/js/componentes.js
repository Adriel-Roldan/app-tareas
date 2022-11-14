import { Todo } from '../classes';
import { todoList } from '../index'

// Referencias del HTML 
const divTodoHtml         = document.querySelector('.todo-list');
const txtInput            = document.querySelector('.new-todo');
const divElemento         = document.querySelector('.todo-list'); 
const btnBorrarCompletado = document.querySelector('.clear-completed');
const filters             = document.querySelector('.filters');
const anchorFiltros       = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) => {

    const htmlTodo = 
    `<li class="${ ( todo.completado ) ? 'completed' : '' }" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked' : '' }>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoHtml.append( div.firstElementChild );

    return div.firstElementChild; 

}

// Eventos en el HTML

txtInput.addEventListener('keyup', ( event ) => {

    if( event.keyCode === 13 && txtInput.value.length > 0 ) {

        const todo = new Todo( txtInput.value ); 
        todoList.nuevoTodo( todo );
        crearTodoHtml( todo );
        txtInput.value = '';
    }
});

divElemento.addEventListener('click', ( event ) => {

    const nombreElemento = event.target.localName; // Retorna en que elemento estamos haciendo click: input, label, button
    const todoElemento = event.target.parentElement.parentElement; // Retorna el contenedor donde esta toda la tarea
    const todoId = todoElemento.getAttribute('data-id'); // Retorna el id
    
    if( nombreElemento.includes('input') ){
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    } else if ( nombreElemento.includes('button') ) {
        todoList.eliminarTodo( todoId );
        divElemento.removeChild( todoElemento ); 
    }

});

btnBorrarCompletado.addEventListener('click', () => {

    todoList.eliminarCompletados(); 

    for( let i = divElemento.children.length - 1; i >= 0; i-- ) {

        const contenedor = divElemento.children[i];

        if( contenedor.classList.contains('completed') ) {

            divElemento.removeChild( contenedor ); 

        }

    }

});

filters.addEventListener('click', (event) => {

    const filtros = event.target.text;
    if( !filtros ) { return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));

    event.target.classList.add('selected');

    for( const elemento of divElemento.children ){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtros ) {

            case 'Pendientes':
                if ( completado ) { elemento.classList.add('hidden'); }
            break;

            case 'Completados':
                if( !completado ) { elemento.classList.add('hidden') }
            break;
        }

    }

});





