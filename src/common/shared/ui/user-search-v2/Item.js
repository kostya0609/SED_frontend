import { ITEM_TYPE } from "./constants";

/**
 * @typedef {object} User
 * @property {number} User.id
 * @property {string} User.full_name
 * @property {string} User.photo
 * @property {string} User.link
 * 
 * @typedef {object} InputRole
 * @property {number} Role.value
 * @property {string} Role.label
 * 
 * @typedef {object} Role
 * @property {number} Role.id
 * @property {string} Role.title
 * @property {string} Role.description
 * 
 */
export class Item {
	/**
	 * @type {string}
	 */
	id;

	/**
	 * @type {number}
	 */
	type_id;

	/**
	 * @type {string}
	 */
	title;

	/**
	 * @type {?User}
	 */
	user;

	/**
	 * @type {?int}
	 */
	user_id;

	/**
	 * @type {?Role}
	 */
	static_role;

	/**
	 * @type {?int}
	 */
	static_role_id;

	/**
	 * @type {?Role}
	 */
	dynamic_role;

	/**
	 * @type {?int}
	 */
	dynamic_role_id;

	/**
	 * @type {boolean}
	 */
	can_deletable;

	/**
	 * @param {User} user 
	 * @returns {Item}
	 */
	static createFromUser(user) {
		const item = new Item();
		item.id = +`${user.id}${ITEM_TYPE.USER}`;
		item.type_id = ITEM_TYPE.USER;
		item.title = user.full_name;
		item.can_deletable = true;

		item.user = user;
		item.user_id = user.id;

		return item;
	}

	/**
	 * @param {Role} role 
	 * @returns {Item}
	 */
	static createFromStaticRole(role) {
		const item = new Item();
		item.id = +`${role.id}${ITEM_TYPE.STATIC_ROLE}`;
		item.type_id = ITEM_TYPE.STATIC_ROLE;
		item.title = role.title;
		item.can_deletable = true;

		item.static_role = role;
		item.static_role_id = role.id;

		return item;
	}

	/**
	 * @param {Role} role 
	 * @returns {Item}
	 */
	static createFromDynamicRole(role) {
		const item = new Item();
		item.id = +`${role.id}${ITEM_TYPE.DYNAMIC_ROLE}`;
		item.type_id = ITEM_TYPE.DYNAMIC_ROLE;
		item.title = role.title;
		item.can_deletable = true;
		
		item.dynamic_role = role;
		item.dynamic_role_id = role.id;

		return item;
	}

	setCanDeletable(canDeletable) {
		this.can_deletable = canDeletable;
		return this;
	}
};