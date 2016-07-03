# debitos
Débitos Directos. App desarrollada con AngularJS y Node Web Kit.


TODO
----
- Vista para importar base de datos existente.
- Eliminar debito?
- Controlar error si no puede crear la base.
- Validación de CBU.
- Armar el string de exportación.


A TENER EN CUENTA
-----------------
- Al agregar débito debería poder elegirse un donante existente o crear nuevo.
- Si ya existe el donante que se quiere crear debería dar error.



Class Donante:
------------
  -nombre
  -apellido
  -cuil
  -direccion

Class Debito:
-------------
  -entidad
  -cbu
  -fvenc
  -falta
  -monto
