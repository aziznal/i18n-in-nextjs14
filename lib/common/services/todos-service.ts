import { NewTodo, Todo, UpdatedTodo } from "../types/todo";
import { User } from "../types/user";
import { CommonParams } from "./common-params";

type GetAllTodosByUserIdParams = {
  userId: User["id"];
};

const getAllTodosByUserId = async ({
  db,
  userId,
}: CommonParams & GetAllTodosByUserIdParams): Promise<Todo[]> => {
  const { data, error } = await db
    .from("todos")
    .select("*")
    .eq("owner_id", userId);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

type CreateTodoParams = {
  userId: User["id"];
  todo: NewTodo;
};

const createTodo = async ({
  db,
  todo,
}: CommonParams & CreateTodoParams): Promise<Todo> => {
  const { data, error } = await db.from("todos").insert(todo).select().single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

type UpdateTodoParams = {
  todoId: Todo["id"];
  userId: User["id"];
  todo: UpdatedTodo;
};

const updateTodo = async ({
  db,
  todoId: id,
  todo,
}: CommonParams & UpdateTodoParams): Promise<Todo> => {
  const { data, error } = await db
    .from("todos")
    .update(todo)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

type DeleteTodoParams = {
  id: Todo["id"];
  userId: User["id"];
};

const deleteTodo = async ({
  db,
  id,
  userId,
}: CommonParams & DeleteTodoParams) => {
  const { error } = await db
    .from("todos")
    .delete()
    .eq("owner_id", userId)
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
};

export {
  type GetAllTodosByUserIdParams,
  getAllTodosByUserId,
  type CreateTodoParams,
  createTodo,
  type UpdateTodoParams,
  updateTodo,
  type DeleteTodoParams,
  deleteTodo,
};
