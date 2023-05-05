import express from 'express';
import { height } from '../controllers/height.controller';

// creating router and merging params 
const router = express.Router({ mergeParams: true });

router.route('/height/:time').get(height);

export default router;