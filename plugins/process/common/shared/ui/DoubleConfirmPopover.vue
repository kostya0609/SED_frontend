<template>
	<el-popover
		ref="popoverRef"
		v-bind="$attrs"
		:width="popoverWidth"
		trigger="click"
		:persistent="true"
		@hide="resetState"
	>
		<template #reference>
			<slot name="reference"></slot>
		</template>

		<div class="double-confirm-popover">
			<div class="double-confirm-popover__content">
				<div
					v-if="!confirmedCheckbox"
					class="double-confirm-popover__first-step"
				>
					<div class="double-confirm-popover__warning-text">
						<el-alert
							type="warning"
							show-icon
							:closable="false"
						>{{ warningText }}</el-alert>
					</div>
					<el-checkbox
						v-model="checkboxValue"
						class="double-confirm-popover__checkbox"
					>
						Я осознаю последствия
					</el-checkbox>
					<div class="double-confirm-popover__actions">
						<el-button
							size="small"
							@click="closePopover"
						>
							Отмена
						</el-button>
						<el-button
							size="small"
							type="primary"
							:disabled="!checkboxValue"
							@click="goToNextStep"
						>
							Продолжить
						</el-button>
					</div>
				</div>

				<div
					v-else
					class="double-confirm-popover__second-step"
				>
					<div class="double-confirm-popover__instruction">
						Введите следующую фразу для подтверждения:
					</div>
					<div class="double-confirm-popover__canvas-wrapper">
						<canvas
							ref="canvasRef"
							class="double-confirm-popover__canvas"
							:width="canvasWidth"
							:height="canvasHeight"
							@click="updatePhrase"
						/>
					</div>
					<el-input
						v-model="inputValue"
						class="double-confirm-popover__input"
						@input="onInputChange"
					/>
					<div class="double-confirm-popover__actions">
						<el-button
							size="small"
							@click="resetState"
						>
							Назад
						</el-button>
						<el-button
							size="small"
							type="primary"
							:disabled="!isPhraseCorrect"
							@click="confirmAction"
						>
							Подтвердить
						</el-button>
					</div>
				</div>
			</div>
		</div>
	</el-popover>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { ElPopover, ElButton, ElCheckbox, ElInput } from 'element-plus';

const props = defineProps({
	warningText: {
		type: String,
		default: 'Это действие может иметь необратимые последствия. Пожалуйста, убедитесь в его необходимости.'
	},
	confirmationPhrases: {
		type: Array,
		default: () => [
			'Параллелепипедообразный',
			'Человеконенавистничество',
			'Превосходительнейше',
			'Решение принято: удаляю',
			'404DELETENOTFOUND',
			'БЕЗВОЗВРАТНОСТЬ-256',
			'Удаляю это без сожаления',
			'Я не передумаю через 5 минут',
			'Санэпидемстанция',
			'Синхрофазотрон',
		]
	},
	popoverWidth: {
		type: Number,
		default: 350
	}
})

const emit = defineEmits(['confirm'])

const popoverRef = ref()
const canvasRef = ref()
const checkboxValue = ref(false)
const confirmedCheckbox = ref(false)
const inputValue = ref('')
const currentPhrase = ref('')
const canvasWidth = ref(300)
const canvasHeight = ref(25)

const isPhraseCorrect = computed(() => {
	return inputValue.value.toLowerCase() === currentPhrase.value.toLowerCase()
})

const getRandomPhrase = () => {
	const randomIndex = Math.floor(Math.random() * props.confirmationPhrases.length)
	return props.confirmationPhrases[randomIndex]
}

const getRandomColor = () => {
	const r = Math.floor(Math.random() * 200); // Ограничиваем до 200, чтобы цвет не был слишком светлым
	const g = Math.floor(Math.random() * 200);
	const b = Math.floor(Math.random() * 200);
	return `rgb(${r}, ${g}, ${b})`;
}

/**
 * 
 * @param ctx {CanvasRenderingContext2D}
 * @param char {string}
 * @param x {number}
 * @param y {number}
 * @param color {string}
 */
const drawCharacter = (ctx, char, x, y, color) => {
	const angle = (Math.random() - 0.5) * 0.2; // Небольшой случайный наклон
	const fontSize = 15 + Math.random() * 2; // Случайный размер шрифта

	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(angle);
	ctx.font = `bold ${fontSize}px Arial`;
	ctx.fillStyle = color;
	ctx.fillText(char, 0, 0);
	ctx.restore();
}

let timeoutId = null;



const drawPhraseOnCanvas = () => {
	const canvas = canvasRef.value;

	if (!canvas) {
		console.error('Canvas element not found');
		return;
	}

	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const phrase = currentPhrase.value;
	const color = getRandomColor();
	let x = 10;
	const y = (canvas.height / 2) + 5;

	// Рассчитаем общую ширину текста
	ctx.font = 'bold 18px Arial'; // Используем средний размер шрифта для расчета
	const totalWidth = ctx.measureText(phrase).width;

	// Рассчитаем дополнительное расстояние между символами
	const extraSpace = (canvas.width - 20 - totalWidth) / (phrase.length - 1);
	const charSpacing = extraSpace; // Минимальное расстояние между символами

	const drawNextChar = (index) => {
		if (index >= phrase.length) return;

		clearTimeout(timeoutId); // Очистка предыдущего таймаута

		drawCharacter(ctx, phrase[index], x, y, color);
		x += ctx.measureText(phrase[index]).width + charSpacing;

		timeoutId = setTimeout(() => drawNextChar(index + 1), 100); // Задержка между появлением символов
	}

	drawNextChar(0);
}

const resetState = () => {
	checkboxValue.value = false
	confirmedCheckbox.value = false
	inputValue.value = ''
	currentPhrase.value = getRandomPhrase()
}

const closePopover = () => {
	if (popoverRef.value) {
		popoverRef.value.hide()
	}
}

const confirmAction = () => {
	emit('confirm')
	closePopover()
}

const onInputChange = () => {
	// Можно добавить дополнительную логику при изменении ввода
}

const updatePhrase = () => {
	currentPhrase.value = getRandomPhrase();
	nextTick(() => {
		drawPhraseOnCanvas();
	});
}

const goToNextStep = () => {
	if (process.env.NODE_ENV === 'development') {
		confirmAction();
		return;
	}

	confirmedCheckbox.value = true;
	currentPhrase.value = getRandomPhrase();

	nextTick(() => {
		drawPhraseOnCanvas();
	});
};
</script>

<style lang="scss">
.double-confirm-popover {
	&__checkbox {
		margin: .5rem 0;
	}

	&__actions {
		display: flex;
		justify-content: flex-end;
	}

	&__instruction {
		margin-bottom: 15px;
		color: #606266;
	}

	&__canvas-wrapper {
		margin-bottom: 15px;
		padding: 10px;
		background-color: #f5f7fa;
		border-radius: 4px;
		display: flex;
		justify-content: center;
	}

	&__input {
		margin-bottom: 15px;
	}
}
</style>