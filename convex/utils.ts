export const getPublicUrl = (key: string) => {
	const endpoint = process.env.R2_PUBLIC_ENDPOINT!;
	return `${endpoint}/${key}`;
};
