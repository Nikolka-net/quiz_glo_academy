'use strict';

document.addEventListener('DOMContentLoaded', function () {

	const btnOpenModal = document.getElementById('btnOpenModal');
	const modalBlock = document.getElementById('modalBlock');
	const closeModal = document.getElementById('closeModal'); // кнопка закрыть окно
	const questionTitle = document.getElementById('question');
	const formAnswers = document.getElementById('formAnswers'); // форма
	const prevButton = document.getElementById('prev'); // кнопки
	const nextButton = document.getElementById('next');
	const sendButton = document.getElementById('send'); // отправка данных


	// Массив для вопросов и ответов
	const questions = [{
			question: "Какого цвета бургер?",
			answers: [{
					id: 1,
					title: 'Стандарт',
					url: './image/burger.png'
				},
				{
					id: 2,
					title: 'Черный',
					url: './image/burgerBlack.png'
				}
			],
			type: 'radio'
		},
		{
			question: "Из какого мяса котлета?",
			answers: [{
					id: 1,
					title: 'Курица',
					url: './image/chickenMeat.png'
				},
				{
					id: 2,
					title: 'Говядина',
					url: './image/beefMeat.png'
				},
				{
					id: 3,
					title: 'Свинина',
					url: './image/porkMeat.png'
				}
			],
			type: 'radio'
		},
		{
			question: "Дополнительные ингредиенты?",
			answers: [{
					id: 1,
					title: 'Помидор',
					url: './image/tomato.png'
				},
				{
					id: 2,
					title: 'Огурец',
					url: './image/cucumber.png'
				},
				{
					id: 3,
					title: 'Салат',
					url: './image/salad.png'
				},
				{
					id: 4,
					title: 'Лук',
					url: './image/onion.png'
				}
			],
			type: 'checkbox'
		},
		{
			question: "Добавить соус?",
			answers: [{
					id: 1,
					title: 'Чесночный',
					url: './image/sauce1.png'
				},
				{
					id: 2,
					title: 'Томатный',
					url: './image/sauce2.png'
				},
				{
					id: 3,
					title: 'Горчичный',
					url: './image/sauce3.png'
				}
			],
			type: 'radio'
		}
	];

	// Закрытие и открытие мод. окна
	btnOpenModal.addEventListener('click', () => {
		modalBlock.classList.add('d-block'); // добавл. display: block
		playTest();
	})

	closeModal.addEventListener('click', () => {
		modalBlock.classList.remove('d-block'); // удал. display: block
	})

	// Запуск тестирования
	const playTest = () => {

		// Массив для ответов
		const finalAnswers = [];
		// Индекс из массива с данными, номер вопроса
		let numberQuestion = 0;

		// Перебор и вывод элементов динамически на стр.: ответ
		const renderAnswers = (index) => {
			questions[index].answers.forEach((answer) => {

				const answerItem = document.createElement('div');
				answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

				answerItem.innerHTML = `
					<input type="${questions[index].type}" id="${answer.id}" name="answer" value="${answer.title}" class="d-none">
					<label for="${answer.id}" class="d-flex flex-column justify-content-between">
					<img class="answerImg" src="${answer.url}" alt="burger">
					<span>${answer.title}</span>
					</label>
					`;
				formAnswers.appendChild(answerItem);
			})

		}

		// Появл. и исчезн. кнопок, если законч. карточки
		const renderButton = (numberQuestion) => {

			if (numberQuestion < (questions.length)) {
				nextButton.classList.remove('d-none');
				sendButton.classList.add('d-none');
			}

			if (numberQuestion === 0) {
				prevButton.classList.add('d-none');
				sendButton.classList.add('d-none');
			}
			if (numberQuestion > 0) {
				prevButton.classList.remove('d-none');
				sendButton.classList.add('d-none');
			}

			if (numberQuestion === questions.length) {
				nextButton.classList.add('d-none');
				prevButton.classList.add('d-none');
				sendButton.classList.remove('d-none');
			}

			if (numberQuestion === questions.length + 1) {
				prevButton.classList.add('d-none');

			}
		}

		// Вставляем текст: вопрос и ответ
		const renderQuestions = (numberQuestion) => {


			formAnswers.innerHTML = ''; // удаляем то, что было раньше
			questionTitle.textContent = '';

			// Если индекс ..., то идёт отрисовка
			if (numberQuestion >= 0 && numberQuestion <= (questions.length - 1)) {
				questionTitle.textContent = `${questions[numberQuestion].question}`;
				renderAnswers(numberQuestion);
			}

			// Показ и скрытие кнопок
			renderButton(numberQuestion);

			if (numberQuestion === questions.length) {

				// Поле ввода телефона
				formAnswers.innerHTML = `
					<div class="form-group">
						<label for="numberPhone">Enter your phone number</label>
						<input type="phone" required class="form-control" id="numberPhone">
					</div>
				`;
			}

			if (numberQuestion === questions.length + 1) {
				formAnswers.textContent = 'Спасибо за пройденный тест! Менеджер свяжется с вами через 15 минут';
				// Закрываем окно через неко-е время
				setTimeout(() => {
					modalBlock.classList.remove('d-block');
				}, 3000);
			}


		}
		renderQuestions(numberQuestion);

		// Заносим ответы в объект
		const checkAnswer = () => {
			const objAnswers = {};

			// Заносим эл. из формы только выбранный, через filter(возвр. выбр. инпут)
			const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');

			// Заполн. объект вопросом и ответом
			inputs.forEach((input, index) => {

				// Если это вопросы
				if (numberQuestion >= 0 && numberQuestion <= (questions.length - 1)) {
					objAnswers[`${index}_${questions[numberQuestion].question}`] = input.value;
				}

				// Если это поле телефона
				if (numberQuestion === questions.length) {
					objAnswers['Номер телефона'] = input.value;
				}
			})

			finalAnswers.push(objAnswers);

		}

		// Событие на кнопки: > или < номер вопроса в массиве
		nextButton.onclick = () => {

			// Заносим ответы в объект
			checkAnswer();
			numberQuestion++; // увелич. индекс в массиве данных
			renderQuestions(numberQuestion); // перед. его, перерисовка
		}
		prevButton.onclick = () => {
			numberQuestion--; // уменьшаем индекс
			renderQuestions(numberQuestion); // перед. его
		}

		// Отправка формы
		sendButton.onclick = () => {
			checkAnswer();
			numberQuestion++;
			renderQuestions(numberQuestion);
		}



	}
});
