import { onUnmounted } from 'vue';
import { EventEmitter } from './EventEmitter';

export const useEventEmitter = () => {
	const emitter = new EventEmitter();

	onUnmounted(() => {
		emitter.removeAllListeners();
	});

	return emitter;
};