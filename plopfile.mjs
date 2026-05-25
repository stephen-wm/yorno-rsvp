import path from 'node:path';

export default function (plop) {
	plop.setWelcomeMessage('Use this to generate new files\n');

	plop.setGenerator('file', {
		description: 'Create a file in a nested directory',
		prompts: [
			{
				type: 'input',
				name: 'fileName',
				message: 'File name (with extension):',
				validate: (value) => (value ? true : 'Required'),
			},
			{
				type: 'list',
				name: 'baseDir',
				message: 'Select base directory:',
				choices: [
					{ name: '🏠 Root', value: './' },
					{ name: '📄 Source', value: './src/' },
				],
			},
			{
				type: 'input',
				name: 'subPath',
				message: (answers) => {
					const nameMap = {
						'./': 'root',
						'./src/': 'source',
					};

					return `Enter subpath inside the ${nameMap[answers.baseDir] || 'base'} (e.g. components/ui):`;
				},
				default: '',
				validate: (v) =>
					v.includes('..') ? 'Subpath must not contain ".."' : true,
				filter: (v) =>
					String(v || '')
						.replaceAll('\\', '/')
						.replace(/(^\/+|\/+$)/g, ''),
			},
		],
		actions: (answers) => {
			const sub = (answers.subPath || '')
				// normalize slashes and strip leading/trailing separators and parent dirs
				.replaceAll('\\', '/')
				.replace(/(^\/+|\/+$)/g, '')
				.replace(/\.\.(\/|$)/g, '');
			const targetPath = path.posix.join(
				answers.baseDir,
				sub,
				answers.fileName,
			);

			return [
				{
					type: 'add',
					path: targetPath,
					templateFile: '',
					abortOnFail: true,
					skipIfExists: true,
				},
			];
		},
	});
}
