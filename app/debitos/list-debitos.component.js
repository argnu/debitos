//jshint esnext:true
angular.
  module('debitos').
  component('listDebitos', {
      templateUrl: 'debitos/list-debitos.template.html',
      controller: ['debitosService', '$location',
        function ListDebitosController(debitosService, $location) {
        var self = this;

        this.$onInit = function() {
          debitosService.getDebitos()
            .then(function(result) {
              self.debitos = result;
            })
            .catch(function(error) {
              alert("Error");
            });
        };

        this.editDebito = function(id) {
          $location.url('/edit/' + id);
        };

        this.deleteDebito = function(id) {
          if (confirm("Esta seguro que quiere eliminar dicho débito?")) {
            var debitosAux = self.debitos.filter(x => !(x.id==id)); //jshint ignore:line
            self.debitos = debitosAux;
            debitosService.deleteDebito(id)
              .then(function(response){

              })
              .catch(function(error) {
                alert("Error");
              });
          }
        };

        this.exportExcel = function(a) {
          var table = `<table>
                        <tr>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>CUIL</th>
                          <th>CBU</th>
                          <th>Monto</th>
                        </tr>`;
          self.debitos.forEach(debito=> {
            table += `<tr>
                        <td>${debito.nombre}</td>
                        <td>${debito.apellido}</td>
                        <td>${debito.cuil}</td>
                        <td style="mso-number-format:\@;">&#8203;${debito.cbu}</td>
                        <td>${debito.monto}</td>
                      </tr>`;
          });
          table += "</table>";
          a.href = 'data:application/vnd.ms-excel;base64,' + btoa(table);
        };

        this.exportPDF = function () {
          var columns = ["Nombre", "Apellido", "CUIL", "CBU", "Monto"];
          var rows = [];
          self.debitos.forEach(debito => {
            var row = [];
            row.push(debito.nombre);
            row.push(debito.apellido);
            row.push(debito.cuil);
            row.push(debito.cbu);
            row.push(debito.monto);
            rows.push(row);
          });

          var doc = new jsPDF('p', 'pt');
          doc.autoTable(columns, rows,{
            margin: {top: 130},
            beforePageContent: function(data) {
                doc.text("Lista de Débitos Directos", 40, 100);
            }
          });
          doc.save('ListaDebitos.pdf');
        };

      }]
  });
