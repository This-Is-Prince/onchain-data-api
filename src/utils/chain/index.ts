// Copyright 2019-2025 @polka-labs/townhall authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { chainBlockTime } from '../constants';
import { getApis } from '../polkadot-api';
import { getFinalizedHeightFromApis } from './finalized';
import { getHeightByTime } from './queryHeight';

async function getHeight(chain: keyof typeof chainBlockTime, time: number) {

	const apis = getApis(chain);
	if (apis.every((api) => !api.isConnected)) {
		throw new Error('No apis connected');
	}

	const finalizedHeightTime = await getFinalizedHeightFromApis(apis);
	if (!(time)) {
		return finalizedHeightTime;
	}

	return await getHeightByTime(chain, apis, time, finalizedHeightTime);
}

export {
	getHeight
};