import { Router } from "express";
import Usersroutes from './user.mjs'
import Productsroutes from './products.mjs'
// This file is used to combine all the routes in one file and export it to the server.js file
const router=Router();

router.use(Usersroutes);
router.use(Productsroutes);



export default router;