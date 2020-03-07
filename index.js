const fs = require('fs').promises;

/**
 * Finds key in a WordPress plugin header file.
 *
 * @param {String} key Key to search for, like Version:, Text Domain:, etc.
 * @param {String} filename Filename to read.
 * @author Tim Elsass
 * @forked Ahmad Awais
 */
const getVersion = async (key, filename) => {
	const file = `${process.cwd()}/${filename}`;

	let content = await fs.readFile(file, 'utf8');
	content = content.replace(/\r/g, '\n');

	let regex = new RegExp(`^[ \t\/*#@]*${key}*?:(.*)$`, 'mi');
	let match = regex.exec(content);

	const header = match[1].replace(/\s*(?:\*\/|\?>).*/, '').trim();
	return header;
};

/**
 * Update Theme/Plugin Header by key.
 *
 * @param {String} filename Filename to update.
 * @param {String} key Key to update in plugin/theme header. Default: 'Version'
 * @param {String} newValue Value to update in header file. Default: '1.0.0'
 * @author Tim Elsass
 * @forked Ahmad Awais
 */
const updateVersion = async (key, newValue, filename) => {
	const file = `${process.cwd()}/${filename}`;
	const regex = new RegExp(`^([ \t\/*#@]*${key}*?:[\t ]*)(.*)$`, 'mi');
	let content = await fs.readFile(file, 'utf8');
	content = content.replace(regex, `$1${newValue}`);
	await fs.writeFile(file, content, 'utf8');
};

module.exports = {
	getVersion,
	updateVersion
};
