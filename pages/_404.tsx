import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		redirect: {
			destination: "https://patrick.miranda.org",
			permanent: true,
		},
	};
};

export default getServerSideProps;
