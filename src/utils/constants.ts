type TChains = {
	kusama: 'kusama',
	polkadot: 'polkadot'
};
type TEvmChains = {
	moonbeam: 'moonbeam',
	moonriver: 'moonriver'
};

const chains: TChains = {
	kusama: 'kusama',
	polkadot: 'polkadot'
};

const evmChains: TEvmChains = {
	moonbeam: 'moonbeam',
	moonriver: 'moonriver'
};

const oneSecond = 1000;
const sixSecond = 6 * oneSecond;
const twelveSecond = 12 * oneSecond;

type TChainBlockTimeMap = {
	[k in keyof typeof chains | keyof typeof evmChains]: number
};

const chainBlockTime: TChainBlockTimeMap = {
	[chains.kusama]: sixSecond,
	[chains.polkadot]: sixSecond,
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
