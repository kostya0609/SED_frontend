import { reactive } from "vue";
import { notify } from "@common/shared/utils";
import { InitRepo } from "@/common/shared/api";

const user = reactive({
	id: null,
	rights: [],
	additional_rights: null,
	is_active: false,
	full_name: null,
	photo: null,
	department: null,
	link: null,
});

/**
 * @TODO: Добавить метод для проверки расширенных прав доступа
 */
export const useUser = () => {
	const checkUserObject = () => {
		if (!user.id) {
			throw new Error('Объект пользователя не был инициализирован!');
		}
	};

	/**
	 * Инициализация пользователя
	 * 
	 * @param {int} userId
	 */
	const initUser = async (userId) => {
		try {
			const result = await InitRepo.getInitialData({
				user_id: userId,
			});

			user.id = result.user.id;
			user.rights = result.rights.rights;
			user.additional_rights = result.rights.additional_rights;

			user.is_active = result.user.is_active;
			user.full_name = result.user.full_name;
			user.photo = result.user.photo;
			user.department = result.user.department;
			user.link = result.user.link;

		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		}
	};

	/**
	 * 
	 * @returns {number} Возвращает id текущего пользователя
	 */
	const getUserId = () => {
		checkUserObject();
		return user.id;
	};

	/**
	 * @returns {string[]} Возвращает массив прав доступа
	 */
	const getRights = () => {
		return user.rights;
	};

	/**
	 * @description Возвращает true, если текущий пользователь имеет права доступа
	 * 
	 * @param {string[]|string} rights
	 * @returns {boolean}
	 */
	const checkUserRights = (rights) => {
		if (typeof rights === 'string') {
			return user.rights.includes(rights);
		} else if (Array.isArray(rights)) {
			for (const value of rights) {
				if (user.rights.includes(value)) {
					return true;
				}
			}

			return false;
		} else {
			throw new Error('Неверный тип прав доступа');
		}
	};

	return {
		user,
		checkUserRights,
		initUser,
		getUserId,
		getRights,
	};
};