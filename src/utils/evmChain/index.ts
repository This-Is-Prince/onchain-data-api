import { getBlockTimeByHeight } from './query/blockTime';
import { getBlockNumber, getHeightByTime,  } from './query/height';
import { evmChains } from '../constants';

async function getEvmHeight(chain: keyof typeof evmChains, timestamp: number) {
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
	getEvmHeight
};