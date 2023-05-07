import express from 'express';
// creating router and merging params 
const router = express.Router({ mergeParams: true });

import heightRouter from './height';
import balanceRouter from './balance';

router.use('/height', heightRouter);
router.use('/balance', balanceRouter);

export default router;