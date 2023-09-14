import express from 'express';
import * as addressController from '../controller/address.js'



const router = express.Router();

// const validateAddress = [
//     body('ua_contents')
//         .trim()
//         .isLength({ min: 4 })
//         .withMessage('ua_contents는 최소 4자이상 입력하세요!'),
//     validate
// ]


router.get('/',    
    addressController.getAddress)

router.get('/getAddress/:ui_idx',    
    addressController.getAddressByAddressId)

router.post('/createAddress', 
    addressController.createAddress);
    
router.put('/:ui_idx',
    addressController.updateAddress);

router.delete('/:uad_idx',
    addressController.deleteAddress);



export default router;