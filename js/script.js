'use strict';

document.addEventListener('DOMContentLoaded', function () {

	const btnOpenModal = document.getElementById('btnOpenModal');
	const modalBlock = document.getElementById('modalBlock');
	const closeModal = document.getElementById('closeModal'); // кнопка закрыть окно
	const questionTitle = document.getElementById('question');
	const formAnswers = document.getElementById('formAnswers'); // форма
	const prevButton = document.getElementById('prev'); // кнопки
	const nextButton = document.getElementById('next');


	// Для вопросов и ответов
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

	btnOpenModal.addEventListener('click', () => {
		modalBlock.classList.add('d-block'); // добавл. display: block
		playTest();
	})

	closeModal.addEventListener('click', () => {
		modalBlock.classList.remove('d-block'); // удал. display: block
	})

	const playTest = () => {

		// Индекс из массива с данными
		let numberQuestion = 0;

		// Создаём элемент на стр.
		const renderAnswers = (index) => {
			questions[index].answers.forEach((answer) => {

				const answerItem = document.createElement('div');
				answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

				answerItem.innerHTML = `
					<input type="${questions[index].type}" id="${answer.id}" name="answer" class="d-none">
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

			if (numberQuestion === (questions.length - 1)) {
				nextButton.classList.add('none');
			}
			if (numberQuestion < (questions.length - 1)) {
				nextButton.classList.remove('none');
			}

			if (numberQuestion === 0) {
				prevButton.classList.add('none');
			}
			if (numberQuestion > 0) {
				prevButton.classList.remove('none');
			}
		}

		// Вставляем текст: вопрос
		const renderQuestions = (numberQuestion) => {

			// Показ и скрытие кнопок
			renderButton(numberQuestion);

			formAnswers.innerHTML = ''; // удаляем то, что было раньше
			questionTitle.textContent = `${questions[numberQuestion].question}`;
			renderAnswers(numberQuestion);
		}
		renderQuestions(numberQuestion);

		// Событие на кнопки
		nextButton.onclick = () => {
			numberQuestion++; // увелич. индекс в массиве данных
			renderQuestions(numberQuestion); // перед. его
		}
		prevButton.onclick = () => {
			numberQuestion--; // уменьшаем индекс
			renderQuestions(numberQuestion); // перед. его
		}


	}
});
