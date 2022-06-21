import Alert from "./alert.js";

/**
 * Clase para el modal
 */
export default class Modal {

    /**
     * Constructor de la clase
     */
    constructor() {
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.btn = document.getElementById('modal-btn');
        this.completed = document.getElementById('modal-completed');
        this.alert = new Alert('modal-alert');

        this.todo = null;
    }

    /**
     * Método que establece en el modal los valores del 
     * todo que le pasamos
     * 
     * @param todo 
     */
    setValues(todo) {
        this.todo = todo;
        this.title.value = todo.title;
        this.description.value = todo.description;
        this.completed.checked = todo.completed;
    }

    /**
     * Método callback
     * 
     * @param callback 
     */
    onClick(callback) {
        this.btn.onclick = () => {
            if (!this.title.value || !this.description.value) {
                this.alert.show('Title and description are required');
                return;
            }

            $('#modal').modal('toggle');

            callback(this.todo.id, {
                title: this.title.value,
                description: this.description.value,
                completed: this.completed.checked,
            });
        }
    }
}
