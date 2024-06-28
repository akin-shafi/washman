import React, { useState } from "react";
import { useRouter } from "next/router";

function Verify2FA() {
	const router = useRouter();
	const [twoFactorToken, setTwoFactorToken] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false); // State to manage loading state of the button

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true); // Start loading

		try {
			const res = await fetch("/api/auth/verify-2fa", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: router.query.email,
					twoFactorToken,
				}),
			});

			const data = await res.json();

			if (!res.ok || data.error) {
				setError(data.error || "Invalid or expired 2FA token");
			} else {
				setMessage("2FA verification successful");
				router.push("/dashboard");
			}
		} catch (error) {
			setError("An error occurred while verifying 2FA");
		} finally {
			setLoading(false); // Stop loading
		}
	};

	const handleResend = async () => {
		try {
			const response = await fetch("/api/auth/resend-2fa", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: router.query.email,
				}),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			setMessage(data.message);
			setError("");
		} catch (error) {
			console.error("Error resending 2FA token:", error);
			setError(error.message || "An unexpected error occurred");
			setMessage("");
		}
	};

	return (
		<>
			<section className="py-3 py-md-5">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-7 col-xxl-6">
							<div className="rounded-3 shadow-sm">
								<div className="card-body p-1">
									<div className="text-center mb-3">
										<img
											src="/images/logo.png"
											alt="Logo"
											width={175}
											height={120}
										/>
									</div>
									<div>
										<h2 className="text-muted text-center">
											Two-Factor Authentication
										</h2>
										<form onSubmit={handleSubmit}>
											<div className="mb-3">
												<div className="text-muted">Enter 2FA Token</div>
												<div className="form-floating mb-3">
													<input
														type="text"
														className="form-control"
														name="twoFactorToken"
														id="twoFactorToken"
														placeholder="2FA Token"
														required
														value={twoFactorToken}
														onChange={(e) => setTwoFactorToken(e.target.value)}
													/>
													<label
														htmlFor="twoFactorToken"
														className="form-label">
														2FA Token
													</label>
												</div>
											</div>

											<div className="mb-3">
												<div className="d-grid my-3">
													<button
														className="btn btn-brand btn-lg"
														type="submit"
														disabled={loading} // Disable the button when loading is true
													>
														{loading ? "Verifying..." : "Verify 2FA"}
													</button>
													<div>
														<p className="text-danger mb-4">{error && error}</p>
														<p className="text-success mb-4">
															{message && message}
														</p>
													</div>
													<div className="d-flex justify-content-end">
														<div
															onClick={handleResend}
															className="my-2">
															<span className="text-muted">
																Didn't receive a token/ it has expired ?{" "}
															</span>
															<span className="link-brand text-decoration-none">
																Resend again
															</span>
														</div>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Verify2FA;
