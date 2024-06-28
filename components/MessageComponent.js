import React from "react";

const messages = [
	{
		key: "timeout",
		content: (
			<div className="alert alert-light text-center text-danger">
				You have been timed out due to inactivity. Please log in again.
			</div>
		),
	},
	{
		key: "success",
		content: (
			<div className="alert alert-light text-center text-success">
				Signup successful. Login
			</div>
		),
	},
	{
		key: "!session",
		content: (
			<div className="alert alert-light text-center text-success text-danger">
				You need to login
			</div>
		),
	},
	// Add more messages as needed
];

const MessageComponent = ({ message }) => {
	const messageObject = messages.find((msg) => msg.key === message);

	return <>{messageObject && messageObject.content}</>;
};

export default MessageComponent;
