const spawnLib = require('child_process').spawn;

function stdOutFnDefault(data) {
  console.log(`stdout: ${data}`);
}

function stdErrFnDefault(data) {
  console.log(`sterr: ${data}`);
}

function closeFnDefault(code) {
  console.log(`child process exited with code ${code}`);
}

class SpawnHelper {
  spawn(executable, argsArr) {
    this.spawnObj = spawnLib(executable, argsArr);

    return this;
  }

  confirm() {
    this.spawnObj.stdin.write('Y\r');
  }

  listen(params = {}) {
    [stdOutFnDefault, params.stdOutFn].forEach(fn => {
      if (typeof fn === 'function') {
        this.spawnObj.stdout.on('data', fn.bind(this));
      }
    });

    [stdErrFnDefault, params.stdErrFn].forEach(fn => {
      if (typeof fn === 'function') {
        this.spawnObj.stderr.on('data', fn);
      }
    });

    [closeFnDefault, params.closeFn].forEach(fn => {
      if (typeof fn === 'function') {
        this.spawnObj.on('close', fn);
      }
    });
  }
};

module.exports = SpawnHelper;
