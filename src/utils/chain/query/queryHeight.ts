import { ApiPromise } from '@polkadot/api';
import { AnyNumber } from '@polkadot/types-codec/types';
import { BlockNumber } from '@polkadot/types/interfaces';
import { extractBlockTime } from './blockTime';
import { chainBlockTime, twelveSecond } from '../../constants';

const blockNumberThreshold = 3;

async function getBlockTimeByHeight(api: ApiPromise, height?: BlockNumber | AnyNumber) {
	const blockHash = await api.rpc.chain.getBlockHash(height);
	const block = await api.rpc.chain.getBlock(blockHash);
	return extractBlockTime(block.block.extrinsics);
}

async function getBlockTimeByHeightFromApis(apis: ApiPromise[], height?: BlockNumber | AnyNumber) {
	const promises = [];
	for (const api of apis) {
		promises.push(getBlockTimeByHeight(api, height));
	}

	return Promise.any(promises);
}

async function getExpected(chain: keyof typeof chainBlockTime, apis: ApiPromise[], lastHeightTime: {
	height: number,
	time: number
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

	const expectedTime = await getBlockTimeByHeightFromApis(apis, expectedHeight);
	const newGap = Math.abs(expectedTime - targetTime);
	return newGap < gap
		? {
			height: expectedHeight,
			time: expectedTime
		}
		: lastHeightTime;
}

async function getHeightByTime(chain: keyof typeof chainBlockTime, apis: ApiPromise[], targetTime: number, lastHeightTime: {
	height: number,
	time: number
}): Promise<{
	height: number,
	time: number
}> {
	const { height, time } = lastHeightTime;
	const blockTime = chainBlockTime[chain] || twelveSecond;
	const gap = Math.abs(targetTime - time);
	if (gap <= blockNumberThreshold * blockTime) {
		return lastHeightTime;
	}

	const { height: expectedHeight, time: expectedTime } = await getExpected(
		chain,
		apis,
		lastHeightTime,
		targetTime
	);
	if (expectedHeight === height) {
		return lastHeightTime;
	}

	return await getHeightByTime(chain, apis, targetTime, {
		height: expectedHeight,
		time: expectedTime
	});
}

export {
	getHeightByTime
};
