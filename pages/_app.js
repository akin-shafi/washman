import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import SessionTimeout from "../components/SessionTimeout";
import "@/styles/css/globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/css/bootstrap-dark.min.css";
import "@/styles/css/style.min.css";
import "@/styles/css/icons.min.css";
import "@/styles/libs/simple-bar/simple-bar.min.js";

export default function App({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		// Dynamically import Bootstrap JS only on the client-side
		if (typeof window !== "undefined") {
			import("bootstrap/dist/js/bootstrap.bundle.min")
				.then(() => {
					console.log("Bootstrap JS loaded");
				})
				.catch((err) => {
					console.error("Failed to load Bootstrap JS:", err);
				});
		}
	}, []);

	useEffect(() => {
		const loadDynamicStyles = async () => {
			if (router.pathname === "/") {
				await import("@/styles/css/site.css");
			}
		};

		loadDynamicStyles();
	}, [router.pathname]);

	return (
		<>
			<Head>
				<title>
					{router.pathname === "/"
						? "Home"
						: router.pathname
								.replace("/", "")
								.replaceAll("-", " ")
								.toUpperCase()}
				</title>

				<meta
					name="description"
					content="Free code tutorial"
				/>
			</Head>
			<SessionProvider session={pageProps.session}>
				<SessionTimeout timeout={300000} /> {/* 5 minutes timeout */}
				{/* <SessionTimeout timeout={10000} /> */}
				{/* 10 Seconds */}
				<Component {...pageProps} />
			</SessionProvider>
		</>
	);
}
