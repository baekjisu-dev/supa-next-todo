import { getTodoAction } from "@/actions/todo/todo.action";
import { createServerSideClient } from "@/lib/supbase"
import { NextResponse } from "next/server";

export const GET =  async () => {
  const result = await getTodoAction();
  console.log(">>>>>", result);

  return NextResponse.json({...result});
}