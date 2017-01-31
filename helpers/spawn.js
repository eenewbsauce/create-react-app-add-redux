function stOutFnDefault(data) {
  this.stdin.write('Y\r');
  console.log(`stdout: ${data}`);
}

function stErrFnDefault(data) {
  console.log(`sterr: ${data}`);
}

function closeFnDefault(code) {
  console.log(`child process exited with code ${code}`);
}

class SpawnHelper {
  static process(spawnObj, closeFn = closeFnDefault, stOutFn = stOutFnDefault, stErrFn = stErrFnDefault) {
    spawnObj.stdout.on('data', stOutFn.bind(spawnObj));
    spawnObj.stderr.on('data', stErrFn.bind(spawnObj));
    spawnObj.on('close', closeFn.bind(spawnObj));
  }
};

module.exports = SpawnHelper;
