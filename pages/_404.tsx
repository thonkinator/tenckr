import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
	return {
		redirect: {
			destination: "https://patrick.miranda.org",
			permanent: true,
		},
	};
};

export default getStaticProps;
