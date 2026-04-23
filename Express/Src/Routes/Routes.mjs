import { Router } from "express";
import Usersroutes from './user.mjs'
import Productsroutes from './products.mjs'

const router=Router();

router.use(Usersroutes);
router.use(Productsroutes);




export default router;