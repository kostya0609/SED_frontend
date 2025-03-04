import {
	Essentials,
	Mention,
	Paragraph,
	Undo,
	Underline,
	Heading,
	BlockQuote,
	Bold,
	Italic,
	Font,
	Link,
	List,
	Alignment,
	Image,
	ImageUpload,
	ImageCaption,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	LinkImage,
	ImageInsert,
	Table,
	TableToolbar,
	TableCellProperties,
	TableProperties,
	Base64UploadAdapter,
} from 'ckeditor5';

import coreTranslations from 'ckeditor5/translations/ru.js';

/**
 * @type {import('@ckeditor/ckeditor5-core/src/editor/editorconfig').EditorConfig}
 */
export const config = {
	plugins: [
		Alignment,
		Bold,
		Essentials,
		Italic,
		Underline,
		Mention,
		Paragraph,
		Undo,
		Heading,
		BlockQuote,
		Font,
		Link,
		List,
		Image,
		ImageToolbar,
		ImageCaption,
		ImageStyle,
		ImageResize,
		LinkImage,
		ImageInsert,
		Table,
		TableToolbar,
		TableCellProperties,
		TableProperties,
		ImageUpload,
		Base64UploadAdapter,
	],
	toolbar: [
		'undo', 'redo', '|',
		'heading',
		'|',
		'alignment',
		'bold',
		'italic',
		'underline',
		'fontSize',
		'fontFamily',
		'fontColor',
		'fontBackgroundColor',
		'|',
		'link',
		'bulletedList',
		'numberedList',
		'blockQuote',
		'|',
		'imageInsert',
		'insertTable',
	],
	heading: {
		options: [
			{ model: 'paragraph', title: 'Параграф', class: 'ck-heading_paragraph' },
			{ model: 'heading1', view: 'h1', title: 'Заголовок 1', class: 'ck-heading_heading1' },
			{ model: 'heading2', view: 'h2', title: 'Заголовок 2', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: 'h3', title: 'Заголовок 3', class: 'ck-heading_heading3' },
			{ model: 'heading4', view: 'h4', title: 'Заголовок 4', class: 'ck-heading_heading4' },
			{ model: 'heading5', view: 'h5', title: 'Заголовок 5', class: 'ck-heading_heading5' },
			{ model: 'heading6', view: 'h6', title: 'Заголовок 6', class: 'ck-heading_heading6' },
		]
	},
	translations: [
		coreTranslations
	],
	image: {
		toolbar: [
			'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|',
			'imageStyle:block', 'imageStyle:side',
			'|',
			'toggleImageCaption', 'imageTextAlternative',
			'|',
			'linkImage'
		],
		insert: {
			// If this setting is omitted, the editor defaults to 'block'.
			// See explanation below.
			type: 'auto'
		}
	},
	table: {
		contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
		defaultHeadings: { rows: 1, columns: 0 },
	},
};