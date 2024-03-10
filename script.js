const operadorPassadoText = document.querySelector('#operador-passado');
const operadorAtualText = document.querySelector('#operador-atual');
const buttons = document.querySelectorAll('.container button');

class Calcular {
    constructor(operadorPassadoText, operadorAtualText) {
        this.operadorPassadoText = operadorPassadoText;
        this.operadorAtualText = operadorAtualText;
        this.operadorAtual = "";
    }

    // Adicionando Digito para a tela da calculadora
    addDigit(digit) {
        // Checando se na operação atual tem virgula
        if (digit === "," && this.operadorAtual.innerText.includes(",")){
            return; 
        } 
        this.operadorAtual = digit;
        this.updateScreen();
    }

    // Processo de todos as operação da calculadora
    processOperation(operation) {
        // Checar se o valor atual é vazio
        if (this.operadorAtualText.innerText === "" && operation !== "C") {
            // Trocar a operação
            if (this.operadorPassadoText.innerText !== "") {
                this.trocarOperation(operation);
            }
            return;
        }

        // Pegar valor passado e atual
        let operadorValue;
        const passado = +this.operadorPassadoText.innerText.split(" ")[0];
        const atual = +this.operadorAtualText.innerText;
     
        switch (operation) {
            case "+":
                operadorValue = passado + atual;
                this.updateScreen(operadorValue, operation, atual, passado);
                break;
            
            case "-":
                operadorValue = passado - atual;
                this.updateScreen(operadorValue, operation, atual, passado);
                break;  

            case "×":
                operadorValue = passado * atual;
                this.updateScreen(operadorValue, operation, atual, passado);
                break;

            case "÷":
                operadorValue = passado / atual;
                this.updateScreen(operadorValue, operation, atual, passado);
                break;

            case "C":
                this.processClearAll();
                break;

            case "CE":
                this.processClearAtual();
                break;

            case "⌫":
                this.processBackspace();
                break;

            case "=":
                this.processResultado();
                break;

            default:
                return;
        }

    }

    // Mudando valores da tela da calculadora
    updateScreen(
        operadorValue = null, 
        operation=null, 
        passado = null,
        atual = null
        ) {
        if (operadorValue === null) {
            this.operadorAtualText.innerText += this.operadorAtual;
        } else {
            // Checando se o valor é zero, se ele for adiciona ao valor atual
            if (passado === 0) {
                operadorValue = atual
            }
            
            // Adiciona valor atual no passado
            this.operadorPassadoText.innerText = `${operadorValue} ${operation}`
            this.operadorAtualText.innerText = "";
        }
    }

    // Trocar operação matemática
    trocarOperation(operation) {
        const mateOperation = ["÷", "×", "+", "-"]

        if (!mateOperation.includes(operation)) {
            return;
        }

        this.operadorPassadoText.innerText = this.operadorPassadoText.innerText.slice(0, -1) + operation;
    }

    // Apaga o ultimo numero atual
    processBackspace() {
        this.operadorAtualText.innerText = this.operadorAtualText.innerText.slice(0, -1);
    }

    // Apaga todos os numeros atual
    processClearAtual() {
        this.operadorAtualText.innerText = "";
    }

    // Apaga tudo
    processClearAll() {
        this.operadorAtualText.innerText = "";
        this.operadorPassadoText.innerText = "";
    }

    // Processar Resultado
    processResultado() {
        const operation = operadorPassadoText.innerText.split(" ")[1];
        this.processOperation(operation);
    }

    // Inverte o sinal do valor atual
    processSinalTrocado() {

    }
}

const calc = new Calcular(operadorPassadoText, operadorAtualText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ",") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});