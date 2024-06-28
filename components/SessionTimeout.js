import { useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { publicRoutes } from "@/lib/publicRoutes";

const SessionTimeout = ({ timeout = 300000 }) => {
	// timeout in milliseconds (e.g., 5 minutes)
	const router = useRouter();
	const timeoutRef = useRef(null);

	const resetTimeout = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		// Apply the timeout only if the user is not on the root or login page
		if (!publicRoutes.includes(router.pathname)) {
			timeoutRef.current = setTimeout(() => {
				signOut({ callbackUrl: "/login?message=timeout" });
			}, timeout);
		}
	};
	useEffect(() => {
		const events = [
			"load",
			"mousemove",
			"mousedown",
			"click",
			"scroll",
			"keypress",
		];

		const resetTimeoutHandler = () => resetTimeout();

		for (const event of events) {
			window.addEventListener(event, resetTimeoutHandler);
		}

		resetTimeout(); // Initialize timeout

		return () => {
			for (const event of events) {
				window.removeEventListener(event, resetTimeoutHandler);
			}
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return null;
};

export default SessionTimeout;
