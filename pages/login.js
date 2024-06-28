import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import Link from "next/link";
import MessageComponent from "@/components/MessageComponent";

function SignIn() {
	const router = useRouter();
	const { data: session, status: sessionStatus } = useSession();
	const searchParams = useSearchParams();
	const sessionMessage = searchParams.get("message");
	const [email, setEmail] = useState("sakinropo@gmail.com");
	const [password, setPassword] = useState("User@123");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false); // State to manage loading state of the button

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true); // Start loading

		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (res.error) {
			setError("Invalid email or password");
		} else {
			setError("");
			if (session?.user?.status === "2FA") {
				router.push({
					pathname: "/verification",
					query: { email },
				});
			} else {
				router.push("/dashboard");
			}
		}

		setLoading(false); // Stop loading regardless of success or failure
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
									<MessageComponent message={sessionMessage} />
								</div>
								<h2 className="text-center text-muted">Login</h2>
								<h2 className="fs-6 fw-normal text-center text-secondary mb-4">
									Fill in your details to login
								</h2>

								<form onSubmit={handleSubmit}>
									<>
										<div className="mb-3">
											<div className="text-muted">Email</div>
											<div className="form-floating mb-3">
												<input
													type="email"
													className="form-control"
													name="email"
													id="email"
													placeholder="name@example.com"
													required
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>
												<label
													htmlFor="email"
													className="form-label">
													Email
												</label>
											</div>
										</div>
										<div className="mb-3">
											<div className="text-muted">Password</div>
											<div className="form-floating mb-3">
												<input
													type="password"
													className="form-control"
													name="password"
													id="password"
													placeholder="Password"
													required
													value={password}
													onChange={(e) => setPassword(e.target.value)}
												/>
												<label
													htmlFor="password"
													className="form-label">
													Password
												</label>
											</div>
										</div>
										<div className="mb-3">
											<div className="d-flex gap-2 justify-content-between">
												<div className="form-check">
													<input
														className="form-check-input"
														type="checkbox"
														name="rememberMe"
														id="rememberMe"
													/>
													<label
														className="form-check-label text-secondary"
														htmlFor="rememberMe">
														Keep me logged in
													</label>
												</div>
												<Link
													href="/forget-password"
													className="link-brand text-decoration-none">
													Forgot password?
												</Link>
											</div>
										</div>

										<div className="mb-3">
											<div className="d-grid my-3">
												<button
													className="btn btn-brand btn-lg"
													type="submit"
													disabled={loading} // Disable the button when loading is true
												>
													{loading ? "Logging in..." : "Log in"}
												</button>
												<div>
													<p className="text-danger mb-4">{error && error}</p>
												</div>
											</div>
										</div>
									</>

									<div className="mb-3">
										<p className="m-0 text-secondary text-center">
											Don't have an account ?{" "}
											<Link
												href="/signup"
												className="link-brand text-decoration-none">
												Sign up
											</Link>
										</p>
									</div>
									<div className="d-flex justify-content-center ">
										<button
											className="btn btn-outline-light me-3"
											type="button"
											onClick={() => {
												signIn("github");
											}}>
											Log in with GitHub
										</button>

										<Link
											href="/"
											className="btn btn-outline-brand">
											Go to Site
										</Link>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SignIn;
