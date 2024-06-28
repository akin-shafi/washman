// pages/login-with-mfa.jsx

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const LoginWithMFAPage = () => {
	const [token, setToken] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleLoginWithMFA = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("/api/login-with-mfa", { token });
			if (response.status === 200) {
				router.push("/dashboard");
			}
		} catch (error) {
			setError("Invalid MFA token");
			console.error("Error logging in with MFA:", error);
		}
	};

	return (
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
								<div className="my-4">
									{/* <MessageComponent message={sessionMessage} /> */}
								</div>
								<h3 className="text-center text-muted">
									Login with Multi-Factor Authentication
								</h3>
								<h2 className="fs-6 fw-normal text-center text-secondary mb-4">
									Fill in your details to login
								</h2>
								<form onSubmit={handleLoginWithMFA}>
									<div className="container text-muted">
										{/* <h2>Login with Multi-Factor Authentication</h2> */}

										<div className="mb-3">
											<div className="text-muted">Enter your MFA token</div>
											<div className="form-floating mb-3">
												<input
													type="text"
													className="form-control"
													placeholder="Enter your MFA token"
													value={token}
													onChange={(e) => setToken(e.target.value)}
												/>
											</div>

											<button
												className="btn btn-lg btn-brand w-100"
												type="submit">
												Log with MFA
											</button>
											{error && <p>{error}</p>}
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LoginWithMFAPage;
