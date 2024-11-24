"use client";
import { pingAction } from "@/actions/ping/ping.action";
import { getTodoAction } from "@/actions/todo/todo.action";
import React from "react";

const ClientComponentText = () => {
	const handleClick = async () => {
		const result = await getTodoAction();
		console.log(result);
	};
	return (
		<div>
			<button onClick={handleClick}>server action</button>
		</div>
	);
};

export default ClientComponentText;
