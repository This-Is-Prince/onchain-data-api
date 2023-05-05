// Copyright 2019-2025 @polka-labs/townhall authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { chainBlockTime, evmChains } from '../constants';
import { getBlockTimeByHeight } from './query/blockTime';
const blockNumberThreshold = 3;

async function getExpected(chain: keyof typeof evmChains, lastHeightTime: {
    height: number;
    time: number;
}, targetTime: number) {
	const { height, time } = lastHeightTime;

	const gap = Math.abs(targetTime - time);
	const heightGap = Math.trunc(gap / chainBlockTime[chain]);

	let expectedHeight;
	if (time > targetTime) {
		expectedHeight = Math.max(height - heightGap, 1);
	} else {
		expectedHeight = Math.max(height + heightGap, 1);
	}

	const expectedTime = await getBlockTimeByHeight(chain, expectedHeight);
	const newGap = Math.abs(expectedTime - targetTime);
	return newGap < gap
		? {
			height: expectedHeight,
			time: expectedTime
		}
		: lastHeightTime;
}

async function getHeightByTime(chain: keyof typeof evmChains, targetTime: number, lastHeightTime: {
    height: number;
    time: number;
}): Promise<{
    height: number;
    time: number;
}> {
	const { height, time } = lastHeightTime;
	const blockTime = chainBlockTime[chain];
	const gap = Math.abs(targetTime - time);
	if (gap <= blockNumberThreshold * blockTime) {
		return lastHeightTime;
	}

	const { height: expectedHeight, time: expectedTime } = await getExpected(
		chain,
		lastHeightTime,
		targetTime
	);
	if (expectedHeight === height) {
		return lastHeightTime;
	}

	return await getHeightByTime(chain, targetTime, {
		height: expectedHeight,
		time: expectedTime
	});
}

export {
	getHeightByTime
};
