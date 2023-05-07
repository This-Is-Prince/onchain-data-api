const rejectInTime = (seconds: number) =>
	new Promise((resolve, reject) => setTimeout(reject, seconds * 1000));

export {
	rejectInTime
};