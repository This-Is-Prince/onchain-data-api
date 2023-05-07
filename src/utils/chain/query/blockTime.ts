import { GenericExtrinsic } from '@polkadot/types';
import { Vec } from '@polkadot/types-codec';
import { AnyTuple } from '@polkadot/types-codec/types';

function extractBlockTime(extrinsics: Vec<GenericExtrinsic<AnyTuple>>) {
	const setTimeExtrinsic = extrinsics.find(
		(ex) => ex.method.section === 'timestamp' && ex.method.method === 'set'
	);
	if (setTimeExtrinsic) {
		const { args } = setTimeExtrinsic.method.toJSON();
		return args.now;
	}
}

export {
	extractBlockTime
};
