NPM I para instalar dependencias 
NPM start para encender el servidor 

todas las rutas necesitan recibir username y password por headers en variables con el mismo nombre, para verificar que el usuario se encuentre registrado

POST a /api/stores Recibe por body un objeto como el sigueinte:
``` js
{
    "name": "Tienda ",
    "cuit": "1234",
    "concepts":[concepto1,concepto2,concepto3,concepto4,concepto5,concepto6],
    "currentBalance": 1234,
    "active": "true",
    "lastSale": "2010/10/10"
}
```
crea en la base de datos una nueva tineda.


 GET a /api/stores?limit=1&page=1 : recibe por query el limite y el numero de pagina, devuelve una lista con las tiendas e informacion sobre el total de tiendas de la siguiente forma:

 ``` javascript
 /api/stores?limit=2&page=1 : 
{
  "data": [
    {
      "id": "62c8948f37cf94097cc7c390",
      "Comercio": "Tienda 1",
      "CUIT": "1234",
      "Concepto_1": 1,
      "Concepto_2": 2,
      "Concepto_3": 3,
      "Concepto_4": 4,
      "Concepto_5": 5,
      "Concepto_6": 6,
      "Balance_actual": 1234,
      "Activo": "si",
      "Última_venta": "2010-10-10T03:00:00.000Z"
    },
    {
      "id": "62c8949237cf94097cc7c393",
      "Comercio": "Tienda 2",
      "CUIT": "1234",
      "Concepto_1": 1,
      "Concepto_2": 2,
      "Concepto_3": 3,
      "Concepto_4": 4,
      "Concepto_5": 5,
      "Concepto_6": 6,
      "Balance_actual": 1234,
      "Activo": "si",
      "Última_venta": "2010-10-10T03:00:00.000Z"
    }
  ],
  "page": "1",
  "pages": 2,
  "limit": "2",
  "total": 4
}
```


