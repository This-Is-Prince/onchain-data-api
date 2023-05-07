import express from 'express';
import { balance } from '../controllers/balance.controller';

// creating router and merging params 
const router = express.Router({ mergeParams: true });

router.route('/').get(balance);

export default router;