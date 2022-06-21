import AddTodo from "./components/add-todo.js";
import Modal from "./components/modal.js";
import Filters from "./components/filters.js";

/**
 * Clase para la View
 */
export default class View {

    /**
     * Constructor de la clase
     */
    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoForm = new AddTodo();
        this.modal = new Modal();
        this.filters = new Filters();

        this.addTodoForm.onClick((title, description) => this.addTodo(title, description));
        this.modal.onClick((id, values) => this.editTodo(id, values));
        this.filters.onClick((filters) => this.filter(filters));
    }

    /**
     * Método para establer el model
     * 
     * @param model 
     */
    setModel(model) {
        this.model = model;
    }

    /**
     * Método que renderiza los todos
     */
    render() {
        const todos = this.model.getTodos();
        todos.forEach((todo) => this.createRow(todo));
    }

    /**
     * Método que filtra los todos en base al filtro
     * o filtros que le pasemos
     * 
     * @param filters 
     */
    filter(filters) {
        const { type, words } = filters;
        const [, ...rows] = this.table.getElementsByTagName('tr');
        for (const row of rows) {
            const [title, description, completed] = row.children;
            let shouldHide = false;

            if (words) {
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
            }

            const shouldBeCompleted = type === 'completed';
            const isCompleted = completed.children[0].checked;

            if (type !== 'all' && shouldBeCompleted !== isCompleted) {
                shouldHide = true;
            }

            if (shouldHide) {
                row.classList.add('d-none');
            } else {
                row.classList.remove('d-none');
            }
            
        }
    }

    /**
     * Método para añadir un nuevo todo a partir del
     * título y descripción que le pasemos
     * 
     * @param title 
     * @param description 
     */
    addTodo(title, description) {
        const todo = this.model.addTodo(title, description);
        this.createRow(todo);
    }

    /**
     * Método que guarda el estado de los todos
     * 
     * @param id 
     */
    toggleCompleted(id) {
        this.model.toggleCompleted(id);
    }

    /**
     * Método para editar un todo determinado con los 
     * valores que le pasemos
     * 
     * @param id 
     * @param values 
     */
    editTodo(id, values) {
        this.model.editTodo(id, values);
        const row = document.getElementById(id);
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].children[0].checked = values.completed;
    }

    /**
     * Método para borrar un todo según su id
     * 
     * @param id 
     */
    removeTodo(id) {
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    /**
     * Método que crea una nueva columna en la tabla de HTML
     * con el todo que le pasemos
     * 
     * @param todo 
     */
    createRow(todo) {
        const row = table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center">

            </td>
            <td class="text-right">
                
            </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);
        
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>'; 
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.onclick = () => this.modal.setValues({
            id: todo.id,
            title: row.children[0].innerText,
            description: row.children[1].innerText,
            completed: row.children[2].children[0].checked,
        });
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>'; 
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);
    }
}
