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

    append: function(file, data) {
      fs.writeFileSync(file, data,  encoding='utf8');
    },

    deleteDir: function (src) {
      fs.readdir(src, function(err, files) {
        files.forEach(function(file) {
          console.log(src + '/' + file);
          fs.unlinkSync(src + '/' + file);
        });
      });
    },

    create: function (src) {
      fs.openSync(src, 'w');
    },

    copyDir: function(src, dest) {
      return new Promise(function(resolve,reject) {
        fs.readdir(src, function(err, files) {
          var total = files.length;
          files.forEach(function(file) {
            var fsSource = fs.createReadStream(src + '/' + file);
            var fsDest = fs.createWriteStream(dest + '/' + file);
            fsSource.pipe(fsDest);
            fsSource.on('end', function () {
              console.log("termino uno",total);
              if (total==1) {
                resolve();
              }
              else {
                total--;
              }
            });
            fsSource.on('error', reject);
          });
        });
      });
    }
  };

})();
