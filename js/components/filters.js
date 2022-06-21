/**
 * Clase para los filtros de búsqueda
 */
export default class Filters {

    /**
     * Constructor de la clase
     */
    constructor() {
        this.form = document.getElementById('filters');
        this.btn = document.getElementById('search');
    }

    /**
     * Método callback
     * 
     * @param callback 
     */
    onClick(callback) {
        this.btn.onclick = (e) => {
            e.preventDefault();
            const data = new FormData(this.form);
            callback({
                type: data.get('type'),
                words: data.get('words'),
            });
        }
    }
}
