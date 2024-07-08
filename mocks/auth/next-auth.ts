
const nextAuthReact = {
	useSession: jest.fn((session, status) => {
		return {data: session, status: status}
	}),
};

export const { useSession } = nextAuthReact;