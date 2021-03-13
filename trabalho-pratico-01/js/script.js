/*

Array de objetos que contem a definição de todos os cálculos do app, que será gerado dinamicamente,
 
Os atributos são:
- id: identifica unicamente o objeto
- description: descrição que será utilizada na tag <label>
-	calculate: função que será executada em momento oportuno
-	type: faz o chaveamento que define a ordem e quais parâmetros serão passados para a função acima.
-	"a-b": indica que a e b serão passados, nesta ordem.
-	"b-a": indica que b e a serão passados, nesta ordem.
-	"a": indica que somente "a" será utilizada.
-	"b": indica que somente "b" será utilizada.

 */

 const globalCalculations = [
	{
		id: 1,
		description: "Soma de (a + b):",
		calculate: function sumCalculator(a, b) {
			return parseInt(a) + parseInt(b);
		},
		type: "a-b"
	},

	{
		id: 2,
		description: "Subtração 01 (a - b):",
		calculate: function subCalculator01(a, b) {
			return parseInt(a) - parseInt(b);
		},
		type: "a-b"
	},

	{
		id: 3,
		description: "Subtração 02 (b - a):",
		calculate: function subCalculator02(a, b) {
			return parseInt(b) - parseInt(a);
		},
		type: "b-a"
	},

	{
		id: 4,
		description: "Multiplicação (a x b):",
		calculate: function multCalculator(a, b) {
			return parseInt(a) * parseInt(b);
		},
		type: "a-b"
	},

	{
		id: 5,
		description: "Divisão 01 (a / b):",
		calculate: function divCalculator01(a, b) {      
			const valueA = parseInt(a);
			const valueB = parseInt(b);

			if(valueB === 0) {
				return 'Não é possível dividir por 0';
			} else {        
				const divider = valueA / valueB;
				return divider.toFixed(2);
			}
		},
		type: "a-b"
	},

	{
		id: 6,
		description: "Divisão 02 (a / b):",
		calculate: function divCalculator02(b, a) {
			const valueA = parseInt(a);
			const valueB = parseInt(b);

			if(valueA === 0) {
				return 'Não é possível dividir por 0';
			} else {        
				const divider = valueB / valueA;
				return divider.toFixed(2);
			}
		},
		type: "b-a"
	},

	{
		id: 7,
		description: "Quadrado de a (a²):",
		calculate: function squaCalculator01(a) {
			const square = a * a;
			return square;
		},
		type: "a"
	},

	{
		id: 8,
		description: "Quadrado de b (b²):",
		calculate: function squaCalculator02(b) {
			const  square = b * b;
			return square;
		},
		type: "b"
	},

	{
		id: 9,
		description: "Divisores inteiros de a:",
		calculate: function divIntCalculator01(a) {
			const integers = []
			let dividers = null;
			let dividersToString = null;
		
			for (let i = 1; i <= a; i++) {
					if (a % i === 0) {
						integers.push(i)
					}
			}
		
			dividers = integers.length
			dividersToString = integers.join(', ')
 
			return `${dividersToString} (${dividers})`
		},
		type: "a"
	},

	{
		id: 10,
		description: "Divisores inteiros de b:",
		calculate: function divIntCalculator02(b) {
			const integers = []
			let dividers = null;
			let dividersToString = null;
		
			for (let i = 1; i <= b; i++) {
					if (b % i === 0) {
						integers.push(i)
					}
			}
		
			dividers = integers.length
			dividersToString = integers.join(', ')
 
			return `${dividersToString} (${dividers})`
		},
		type: "b"
	},

	{
		id: 11,
		description: "Fatorial de a (a!):",
		calculate: function factCalculator01(a) {
			if(a <= 21) {
				let count = result = 1;
		 
				while(count <= a) {
					result *= count;
					count++;
				}        
				return result;

			} else {
				return "Número maior do que 21";
			}
		},
		type: "a"
	},

	{
		id: 12,
		description: "Fatorial de b (b!):",
		calculate: function factCalculator02(b) {
			if(b <= 21) {
				let count = result = 1;
				
				while(count <= b) {
					result *= count;
					count++;
				}        
				return result;
				
			} else {
				return "Número maior do que 21";
			}
		},
		type: "b"
	}
];

// Mapeamento dos inputs de interação com o usuário, que estão em index.html.

const globalInputA = document.querySelector("#input-a");
const globalInputB = document.querySelector("#input-b");

// Tudo começa aqui. A execução desta função está no final deste arquivo.

function start() {
	
	// Adicionando evento para "escutar" a mudança de valores nos inputs
	globalInputA.addEventListener("input", handleChangeInputA);
	globalInputB.addEventListener("input", handleChangeInputB);

	// Efetuando o cálculo inicials
	calculate();
}

// Função executada após interação com o usuário, que dispara o cálculo.

function handleChangeInputA() {
	calculate();
}

// Função executada após interação com o usuário, que dispara o cálculo.
function handleChangeInputB() {
	calculate();
}

// Principal função do app, que efetua os cálculos e monta a seção "Cálculos" dinamicamente.
function calculate() {

	// Obtendo os valores de a e b a partir dos inputs.
	let a = globalInputA.value;
	let b = globalInputB.value;

	// Obtendo a div onde serão exibidos  todos os cálculos.
	const divCalculations = document.querySelector("#calculations");

	// Criando div interna que será preenchida dinamicamente.
	const innerCalculations = document.createElement("div");

	// Adicionando class "row" que faz parte do modelo de grid do Materialize.
	innerCalculations.classList.add("row");

	// Geração dinâmica dos cálculos
	for (let i = 0; i < globalCalculations.length; i++) {
		
		// Apelidando cálculo atual em currentCalculation.
		let currentCalculation = globalCalculations[i];

		// Montando id único
		let id = "input-" + currentCalculation.id;

		// Calculando o valor conforme a função calculate e type.
		let value = getCalculationFrom(
			currentCalculation.type,
			currentCalculation.calculate,
			a,
			b
		);

		// Montando os elementos conforme regras do Materialize.
		let div = getMaterializeDiv();
		let input = getMaterializeInput(id, value);
		let label = getMaterializeLabel(id, currentCalculation.description);

		div.appendChild(input);
		div.appendChild(label);
		innerCalculations.appendChild(div);
	}

	// Após o loop, zeramos a div e inserimos innerCalculations como filha.
	divCalculations.innerHTML = "";
	divCalculations.appendChild(innerCalculations);
}

/*

Obtendo uma nova div conforme regras do Materialize no sistema de grid do Materialize:
-	A div "mãe" tem a class "row" e todos os filhos tem class "col".
-	12 é o "número mágico" do sistema de grids do Materialize. 
-	s12 indica que, em dispositivos pequemos (small), serão exibidos 12/12 => 1 elemento por linha
-	m6 indica que, em dispositivos médios (medium), serão exibidos 12/6 => 2 elementos por linha
-	l4 indica que, em dispositivos grandes (large), serão exibidos 12/4 => 3 elementos por linha
 
Mais detalhes e configurações podem ser vistos em: https://materializecss.com/grid.html

*/
function getMaterializeDiv() {
	const div = document.createElement("div");
	div.classList.add("input-field", "col", "s12", "m6", "l4");

	return div;
}

// Obtendo um novo input somente-leitura, com id e value passados por parâmetro
function getMaterializeInput(id, value) {
	const input = document.createElement("input");
	input.readOnly = true;
	input.type = "text";
	input.id = id;
	input.value = value;

	return input;
}

// Obtendo um novo label, com id e descrição (textContent) passados por parâmetro.
function getMaterializeLabel(id, description) {
	const label = document.createElement("label");
	label.for = id;
	label.textContent = description;
	label.classList.add("active");

	return label;
}

/*

Lógica para identificar qual(is) parâmetro(s) será(ão) utilizado(s) e a respectiva ordem.

calculationFunction chega como parâmetro, e é justamente o atributo "calculate" do objeto "calculations", que é a função a ser executada

*/
function getCalculationFrom(type, calculationFunction, a, b) {
	let value = "";

	switch (type) {
		case "a":
			value = calculationFunction(a);
			break;

		case "b":
			value = calculationFunction(b);
			break;

		case "a-b":
			value = calculationFunction(a, b);
			break;

		case "b-a":
			value = calculationFunction(b, a);
			break;

		default:
			value = "Cálculo não identificado.";
	}

	return value;
}

// Início da execução do app
start();
