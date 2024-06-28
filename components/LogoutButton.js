// components/LogoutButton.js
import { useRouter } from "next/router";

export default function LogoutButton({ type }) {
	const router = useRouter();

	const handleLogout = async () => {
		const response = await fetch("/api/auth/logout", {
			method: "POST",
		});

		if (response.ok) {
			router.replace("/login"); // Redirect to the login page after logout
		} else {
			console.error("Failed to log out");
		}
	};

	return (
		<>
			{type === "header" ? (
				<button
					className="dropdown-item text-dark pointer"
					onClick={handleLogout}>
					<span className="mb-0 d-inline-block me-1">
						<i className="ti ti-logout"></i>
					</span>
					Log out
				</button>
			) : (
				<button
					onClick={handleLogout}
					className="pointer border">
					<i className="ti ti-logout me-2 text-muted"></i>
					<small className="text-muted fw-medium ms-1">Log out</small>
				</button>
			)}
		</>
	);
}
