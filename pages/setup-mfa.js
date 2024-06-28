// pages/setup-mfa.jsx

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const SetupMFAPage = () => {
	const [secret, setSecret] = useState("");
	const [qrCodeURL, setQRCodeURL] = useState("");
	const router = useRouter();

	const generateMFAQRCode = async () => {
		try {
			const response = await axios.post("/api/generate-mfa-qr", { secret });
			setQRCodeURL(response.data.qrCodeURL);
		} catch (error) {
			console.error("Error generating QR code:", error);
		}
	};

	const handleSetupMFA = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("/api/setup-mfa", { secret });
			if (response.status === 200) {
				router.push("/login?message=mfa-enabled");
			}
		} catch (error) {
			console.error("Error setting up MFA:", error);
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
									Setup Multi-Factor Authentication
								</h3>
								<h2 className="fs-6 fw-normal text-center text-secondary mb-4">
									Fill in your details to generate your MFA
								</h2>
								<form
									onSubmit={generateMFAQRCode}
									className="">
									{/* <h1>Setup Multi-Factor Authentication</h1> */}
									<div className="mb-3">
										<div className="text-muted">Enter your MFA secret</div>
										<div className="form-floating mb-3">
											<input
												type="text"
												className="form-control"
												placeholder="Enter your MFA secret"
												value={secret}
												onChange={(e) => setSecret(e.target.value)}
											/>
										</div>
									</div>
									<button
										// onClick={generateMFAQRCode}
										className="btn btn-lg btn-brand w-100">
										Generate QR Code
									</button>

									{qrCodeURL && (
										<div>
											<img
												src={qrCodeURL}
												alt="MFA QR Code"
											/>
											<button onClick={handleSetupMFA}>Enable MFA</button>
										</div>
									)}
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SetupMFAPage;
