#!/usr/bin/env node

import program from 'commander';

import Illustrator from './index';

program
    .version('0.0.1');

program
    .command('start')
    .description('Start Illustrator')
    .action(() => {
        Illustrator.start();
    });

program
    .command('create-document')
    .description('Create new document')
    .option('-w, --width <n>', 'The width of the document', parseInt, 800)
    .option('-h, --height <n>', 'The height of the document', parseInt, 600)
    .action(({ width, height }) => {
        Illustrator.createDocument({ width, height });
    });

program
    .command('add-text <text>')
    .description('Add text to a document')
    .option('-x, --x <n>', 'The x position', parseInt, 0)
    .option('-y, --y <n>', 'The y position', parseInt, 0)
    .option('-n, --name <n>', 'The name of the text frame', null, 'text')
    .option('-d, --document <n>', 'The name or the index of the document', null, 1)
    .action((text, { x, y, document, name }) => {
        Illustrator.addText({ text, x, y, name, document });
    });

program
    .command('add-image <url>')
    .description('Add an image to a document')
    .option('-x, --x <n>', 'The x position', parseInt, 0)
    .option('-y, --y <n>', 'The y position', parseInt, 0)
    .option('-n, --name <n>', 'The name of the text frame', null, 'text')
    .option('-d, --document <n>', 'The name or the index of the document', null, 1)
    .action((url, { x, y, document, name }) => {
        Illustrator.addImage({ url, x, y, name, document });
    });

program
    .command('move <type> <name> <x> <y>')
    .description('Move an element')
    .option('-d, --document <n>', 'The name or the index of the document', null, 1)
    .action((type, name, x, y, { document }) => {
        Illustrator.move({ type, name, x, y, document });
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
