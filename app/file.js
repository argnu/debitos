var FileAPI = (function() {

  var fs = require("fs");

  return {
    import: function (src, dest) {
      return new Promise(function(resolve, reject) {
        var fsSource = fs.createReadStream(src);
        var fsDest = fs.createWriteStream(dest);

        fsSource.pipe(fsDest);
        fsSource.on('end', resolve);
        fsSource.on('error', reject);
      });
    }

  };

})();
