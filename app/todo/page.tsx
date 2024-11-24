import { pingAction } from "@/actions/ping/ping.action";
import { sleep } from "@/lib/utils";
import React from "react";
import ClientComponentText from "./clientComponentTest/ClientComponentText";
import { getTodoAction } from "@/actions/todo/todo.action";

const page = async () => {
	const result = await getTodoAction();

	return (
		<div>
			{JSON.stringify(result)}
			<ClientComponentText />
		</div>
	);
};

export default page;
