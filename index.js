#!/usr/local/bin/node

const spawn = require('child_process').spawn;
const deps = ['redux', 'react-redux'];

const installDeps = deps.forEach(dep => {
  spawn('npm', ['i', '--save', dep]);
});
