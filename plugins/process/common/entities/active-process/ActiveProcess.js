import { Process } from "./Process";
import { ACTIVE_PROCESS_TYPE } from "@/plugins/process/common";

export class ActiveProcess {
	/** @type { Array<any>|null } */
	completed_history;

	/** @type { string } */
	message;

	/** @type { Process } */
	process;

	/**@type { number } */
	type;

	constructor(activeProcess) {
		Object
			.entries(activeProcess)
			.forEach(([key, value]) => {
				if (key === 'process') {
					this.process = value ? new Process(value) : null;
				} else {
					this[key] = value;
				}
			});
	}

	isCreated() {
		return this.type === ACTIVE_PROCESS_TYPE.CREATED;
	}

	isCompleted() {
		return this.type === ACTIVE_PROCESS_TYPE.COMPLETED;
	}

	isNotCreated() {
		return this.type === ACTIVE_PROCESS_TYPE.NOT_CREATED;
	}
}