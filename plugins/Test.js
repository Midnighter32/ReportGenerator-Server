exports.load = function (carbone) {
    carbone.addFormatters({
      func : function (msg) {
        return msg + "thing"
      }
    })
}