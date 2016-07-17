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
    },
<<<<<<< HEAD

    createFile: function(path)  {
      return fs.openSync(path, "w");
    },

    append: function(file, data) {
    fs.writeFileSync(file, data,  encoding='utf8');
    }


=======

    delete: function (path) {
      fs.unlinkSync(path);
    },
>>>>>>> 032e37cc7c1dc662a675395b892650576794b508

    create: function (src) {
      fs.openSync(src, 'w');
    }
  };

})();
