const logger = require('../utils/logger');
const express = require('express');
const store = require('../models/store');
const user = require('../models/user');
const router = express.Router();
const { check, validationResult } = require('express-validator');


// router.route('/stores')
//   .get(function(){logger.info("pending validations")}, function(){logger.info("pending use case")});
const Cratevalidations = [
  check('name','Por favor ingresa un nombre valido')
  .isString()
  .exists().not().isEmpty(),
  check('cuit','Por favor ingresa un cuit valido')
  .isString()
  .exists().not().isEmpty(),
  check('concepts','Por favor ingresa un concepts valido')
  .isArray()
  .exists().not().isEmpty(),
  check('currentBalance','Por favor ingresael valance valido')
  .isNumeric()
  .exists().not().isEmpty(),
  check('active','Por favor ingresa un valor valido')
  .isBoolean()
  .exists().not().isEmpty(),
  check('lastSale','Por favor ingresa un lastSale valido')
  .isDate()
  .exists().not().isEmpty(),
]

  router.get("/stores",async (req,res,next)=>{
    try {
      const {username, password} = req.headers
      const finduser =await user.findOne({username:username})
      if(finduser){

        auntenticate = finduser.verifyPassword(password)
        if(auntenticate){
          const {limit, page}=req.query
          if(!page || !limit){return res.send(400)}
          const tiendas = await store.find()
          let pages = Math.floor(tiendas.length / limit) || 1
          
          let last = page * limit
          let first = last - limit
          const data = tiendas.slice(first, last)
       
      const result = data.map((tienda)=>{
          return { id: tienda._id,
            Comercio:tienda.name,
            CUIT: tienda.cuit,
            Concepto_1: tienda.concepts[0],
            Concepto_2: tienda.concepts[1],
            Concepto_3: tienda.concepts[2],
            Concepto_4: tienda.concepts[3],
            Concepto_5: tienda.concepts[4],
            Concepto_6: tienda.concepts[5],
            Balance_actual:tienda.currentBalance,
            Activo: tienda.active? "si": "no",
            Última_venta: tienda.lastSale,}
          })
          res.send({
            data:result,
            page,
            pages,
            limit,
            total: tiendas.length})
          }else{
            res.status(401).send("usuario o contraseña invalidos")
          }
        }else{
          res.status(401).send("usuario o contraseña invalidos")
        }
          
    } catch (error) {
      next(error)
    }

  })

  router.post("/stores",Cratevalidations,async (req,res,next)=>{
   
    try {
      const {username, password} = req.headers
      const finduser =await user.findOne({username:username})
      if(finduser){
        auntenticate = finduser.verifyPassword(password)
        if(auntenticate){
          const {name, cuit, concepts, currentBalance, active, lastSale} = req.body
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          const Tienda = new store({
              name,
              cuit,
              concepts,
              currentBalance,
              active,
              lastSale,})
          Tienda.save()
          res.send(201)}
          else {
            res.status(401).send("usuario o contraseña invalidos")
          }
        }else{
          res.status(401).send("usuario o contraseña invalidos")
        }
     
       
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

module.exports = router;
