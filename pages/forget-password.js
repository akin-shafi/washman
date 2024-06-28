import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [showSection2, setShowSection2] = useState(false);
	const [loading, setLoading] = useState(false); // State to manage loading state of the button

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true); // Start loading

		try {
			const response = await axios.post("/api/forgot-password", { email });
			setMessage(response.data.message);
			setShowSection2(true);
		} catch (error) {
			setMessage(error.response.data.message);
		}

		setLoading(false); // Stop loading regardless of success or failure
	};

	return (
		<>
			<section className="py-3 py-md-5">
				<div className="container">
					<div className="row justify-content-center ">
						<div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-7 col-xxl-6">
							<div className="rounded-3 shadow-sm">
								<div className="card-body p-3 p-md-4 p-xl-5">
									<div className="text-center mb-3">
										<Link href="/forget-password">
											<Image
												src="/images/logo.png"
												alt="Logo"
												width={175}
												height={120}
											/>
										</Link>
									</div>
									{!showSection2 && (
										<section className="section1">
											<h2 className="text-center text-white mb-4 fs-36">
												Forgot Your Password?
											</h2>
											<div className="text-muted my-4">
												Enter your primary email address and we’ll send you
												instructions on how to reset your password.
											</div>
											<form onSubmit={handleSubmit}>
												<div className="row gy-2 overflow-hidden">
													<div className="col-12">
														<div className="text-white">Email</div>
														<div className="form-floating mb-3">
															<input
																type="email"
																className="form-control"
																id="email"
																placeholder="name@example.com"
																value={email}
																onChange={(e) => setEmail(e.target.value)}
																required
															/>
															<label
																htmlFor="email"
																className="form-label">
																Email
															</label>
														</div>
													</div>

													<div className="col-12">
														<div className="d-grid my-3">
															<button
																className="btn btn-brand btn-lg"
																type="submit"
																disabled={loading} // Disable the button when loading is true
															>
																{loading
																	? "Sending..."
																	: "Send Reset instructions"}
															</button>
														</div>
													</div>
													<div className="col-12">
														<p className="m-0 text-secondary text-center">
															Back to{" "}
															<Link
																href="/login"
																className="link-brand text-decoration-none">
																Login
															</Link>
														</p>
													</div>
												</div>
											</form>
											{message && <p>{message}</p>}
										</section>
									)}
									{showSection2 && (
										<section className="section2">
											<h2 className="text-center text-white mb-4 fs-36">
												Check Your Email
											</h2>
											<p className="text-muted fs-24">
												If we find{" "}
												<span className="text--highlight">{email}</span> in our
												system, we will send you an email with a link to reset
												your password.
												<br />
												<br />
												If you don't receive the email, check your spam folder
												or contact us.
												<br />
												<br />
												Or try password reset using a{" "}
												<Link
													href="/reset-password"
													className="text-primary">
													different email address
												</Link>
												.
											</p>
										</section>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
