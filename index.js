#!/usr/local/bin/node
const path = require('path');

const SpawnHelper = require('./helpers').spawnHelper;
const deps = ['redux', 'react-redux'];
const dirs = ['actions'];

// //eject app
// const eject = new SpawnHelper();
// eject
//   .spawn('npm', ['run', 'eject'])
//   .listen({
//     stdOutFn: eject.confirm
//   });
//
// //install dependecies
// deps.forEach(dep => {
//   new SpawnHelper()
//     .spawn('npm', ['i', '--save', dep])
//     .listen();
// });
//
// //create directories
// dirs.forEach(dir => {
//   new SpawnHelper()
//     .spawn('mkdir', ['-p', `src/${dir}`])
//     .listen();
// });

//move templates
new SpawnHelper()
  .spawn('cp', ['-r', path.join(__dirname, 'templates/'), 'src'])
  .listen()
