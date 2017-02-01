class FormatHelper {
  static addTabs(line) {
    let lineParts = line.split(' ');
    lineParts.pop();

    return lineParts.join(' ');
  }
}

module.exports = FormatHelper;
