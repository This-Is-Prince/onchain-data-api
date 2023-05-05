const chains = {
	kusama: 'kusama',
	polkadot: 'polkadot'
};
const chainEndpoints = [
	{
		chain: 'kusama',
		endpoints: [
			'wss://kusama.api.onfinality.io/public-ws',
			'wss://kusama-rpc.dwellir.com',
			'wss://kusama-rpc.polkadot.io',
			'wss://rpc.ibp.network/kusama',
			'wss://rpc.dotters.network/kusama'
		]
	},
	{
		chain: 'polkadot',
		endpoints: [
			'wss://kusama.api.onfinality.io/public-ws',
			'wss://kusama-rpc.dwellir.com',
			'wss://kusama-rpc.polkadot.io',
			'wss://rpc.ibp.network/kusama',
			'wss://rpc.dotters.network/kusama'
		]
	}
];
const getEndpoints = () => {
	return chainEndpoints;
};

export {
	chains,
	getEndpoints
};
