// hoc/withAuth.js
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
	return (props) => {
		const { data: session, status } = useSession();
		const router = useRouter();

		useEffect(() => {
			if (status === "loading") return; // Do nothing while loading
			if (!session) router.push("/login"); // Redirect if not authenticated
		}, [session, status, router]);

		if (status === "loading" || !session) {
			return <div>Loading...</div>;
		}

		return <WrappedComponent {...props} />;
	};
};

export default withAuth;
