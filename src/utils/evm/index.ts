// Copyright 2019-2025 @polka-labs/townhall authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { getHeightByTime } from './queryHeight';
import { getBlockTimeByHeight } from './query/blockTime';
import { getBlockNumber } from './query/height';
import { evmChains } from '../constants';

async function getHeight(chain: keyof typeof evmChains, timestamp: number) {
	if (!/^\d+$/.test(`${timestamp}`)) {
		throw new Error('Invalid time');
	}

	const height = await getBlockNumber(chain);
	const time = await getBlockTimeByHeight(chain, height);

	return await getHeightByTime(chain, timestamp, {
		height: parseInt(`${height}`),
		time
	});
}

export {
	getHeight
};