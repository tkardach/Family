
// Date methods
if (!Date.prototype.compareDate) {
  Date.prototype.compareDate = function(date1) {
    if (!(date1 instanceof Date))
      return false;

    let date = new Date(this);
    let comp = new Date(date1);

    return date - comp;
  }
}

// String methods
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}