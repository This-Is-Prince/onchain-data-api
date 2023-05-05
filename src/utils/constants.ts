const chains = {
	kusama: 'kusama',
	polkadot: 'polkadot'
};

const oneSecond = 1000;
const sixSecond = 6 * oneSecond;
const twelveSecond = 12 * oneSecond;

const evmChains = Object.freeze({
	moonbeam: 'moonbeam',
	moonriver: 'moonriver'
});

const chainBlockTime = {
	kusama: sixSecond,
	polkadot: sixSecond,
	[evmChains.moonriver]: twelveSecond,
	[evmChains.moonbeam]: twelveSecond
};

const symbols = {
	KSM: 'KSM'
};

export {
	chains,
	evmChains,
	symbols,
	chainBlockTime,
	twelveSecond
};
