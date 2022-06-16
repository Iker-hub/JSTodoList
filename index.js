// Nos aseguramos que todo el DOM (Document Object Model) se ha cargado
// El DOM representa index.html como objeto
document.addEventListener('DOMContentLoaded', function() {

    // Inicializamos componentes
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const table = document.getElementById('table');
    const alert = document.getElementById('alert');
    const btn = document.getElementById('add');

    /**
     * Método para añadir ToDo
     **/
    function addTodo() {
        if (title.value === '' || description.value === '') {
            alert.classList.remove('d-none');
            alert.innerText = 'Title and description are required';
        } else {
            alert.classList.add('d-none');
        }
    }

    btn.onclick = addTodo;
});
