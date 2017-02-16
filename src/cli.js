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
    .action((env) => {
        Illustrator.createDocument(env.width, env.height);
    });

program
    .command('add-text [text]')
    .description('Add text to a document')
    .action((text) => {
        Illustrator.addText(text);
    });

program
    .command('add-image [url]')
    .description('Add an image to a document')
    .action((url) => {
        Illustrator.addImage(url);
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
