'use strict';

document.addEventListener('DOMContentLoaded', function () {

	const btnOpenModal = document.getElementById('btnOpenModal');
	const modalBlock = document.getElementById('modalBlock');
	const closeModal = document.getElementById('closeModal'); // кнопка закрыть окно
	const questionTitle = document.getElementById('question');
	const formAnswers = document.getElementById('formAnswers'); // форма

	const standartBurger = 'Стандарт';
	const standartBurgerSrc = 'burger.png';

	btnOpenModal.addEventListener('click', () => {
		modalBlock.classList.add('d-block'); // добавл. display: block
		playTest();
	})

	closeModal.addEventListener('click', () => {
		modalBlock.classList.remove('d-block'); // удал. display: block
	})

	const playTest = () => {

		// Вставляем текст и рисунки
		const renderQuestions = () => {
			questionTitle.textContent = 'Какого цвета бургер вы хотите?';

			formAnswers.innerHTML = `
			<div class="answers-item d-flex flex-column">
				<input type="radio" id="answerItem1" name="answer" class="d-none">
				<label for="answerItem1" class="d-flex flex-column justify-content-between">
					<img class="answerImg" src="./image/${standartBurgerSrc}" alt="burger">
					<span>${standartBurger}</span>
				</label>
	  	</div>
			`;
		}
		renderQuestions();
	}
});
