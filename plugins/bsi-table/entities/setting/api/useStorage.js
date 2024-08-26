import { LocalStore } from "./storages/LocalStore";
import { VariableStore } from "./storages/VariableStore";

const storages = {
	none: new VariableStore(),
	local: new LocalStore(),
};

/**
 * @param {'none'|'local'} type
 */
export const useStorage = (type) => {
	const storage = storages[type];

	if (!storage) {
		throw new Error(`Storage type "${type}" is not supported.`);
	}

	return storage;
};