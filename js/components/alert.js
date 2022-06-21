/**
 * Clase para los alert
 */
export default class Alert {

    /**
     * Constructor de la clase
     * 
     * @param alertId 
     */
    constructor(alertId) {
        this.alert = document.getElementById(alertId);
    }

    /**
     * Método que muestra un alert con el mensaje 
     * que le pasemos
     * 
     * @param message 
     */
    show(message) {
        this.alert.classList.remove('d-none');
        this.alert.innerText = message;
    }

    /**
     * Método que esconde un alert
     */
    hide() {
        this.alert.classList.add('d-none');
    }

}
