/**
 * Clase para el Model
 */
export default class Model {

    /**
     * Constructor de la clase
     */
    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if (!this.todos || this.todos.length < 1) {
            this.todos = [
                {
                    id: 0,
                    title: 'Learn JS',
                    description: 'Watch JS Tutorial',
                    completed: false,
                }
            ];
            this.currentId = 1;
        } else {
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }
    }

    /**
     * Método para establecer la view
     * 
     * @param view 
     */
    setView(view) {
        this.view = view;
    }

    /**
     * Método para guardar los datos en el LocalStorage
     */
    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    /**
     * Método para obtener los todos
     * 
     * @returns todos
     */
    getTodos() {
        return this.todos.map((todo) => ({...todo}));
    }

    /**
     * Método para obtener un todo a través de su id
     * 
     * @param id 
     * @returns todo
     */
    findTodo(id) {
        return this.todos.findIndex((todo) => todo.id === id);
    }
    
    /**
     * Método que guarda el estado de los todos
     * 
     * @param id 
     */
    toggleCompleted(id) {
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        this.save();
    }

    /**
     * Método para editar un todo determinado con los 
     * valores que le pasemos
     * 
     * @param id 
     * @param values 
     */
    editTodo(id, values) {
        const index = this.findTodo(id);
        Object.assign(this.todos[index], values);
        this.save();
    }

    /**
     * Método para añadir un nuevo todo a partir del
     * título y descripción que le pasemos
     * 
     * @param title 
     * @param description 
     * @returns todo
     */
    addTodo(title, description) {
        const todo = {
            id: this.currentId++,
            title,
            description,
            completed: false,
        };

        this.todos.push(todo);
        console.log(this.todos);
        this.save();
        return {...todo};
    }

    /**
     * Método para borrar un todo según su id
     * 
     * @param id 
     */
    removeTodo(id) {
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
        this.save();
    }
}
