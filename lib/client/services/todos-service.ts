import {
  createTodo,
  CreateTodoParams,
  deleteTodo,
  DeleteTodoParams,
  getAllTodosByUserId,
  GetAllTodosByUserIdParams,
  updateTodo,
  UpdateTodoParams,
} from "@/lib/common/services/todos-service";
import { createClient } from "@/lib/common/supabase-clients/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../tanstack-query-client";
import { Todo } from "@/lib/common/types/todo";

const supabaseClient = createClient();

export const todosKeyFactory = {
  all: ["todos"] as const,
  getTodosByUserId: (userId: string) =>
    [...todosKeyFactory.all, "get-todos", userId] as const,
};

/** invalidates all todo query caches */
const invalidateCache = async () => {
  return queryClient.invalidateQueries({
    queryKey: todosKeyFactory.all,
    type: "all",
    stale: true,
  });
};

export const useGetAllTodosByUserIdQuery = (
  params: GetAllTodosByUserIdParams,
) =>
  useQuery({
    queryKey: todosKeyFactory.getTodosByUserId(params.userId),
    queryFn: () =>
      getAllTodosByUserId({
        ...params,
        db: supabaseClient,
      }),
  });

export const useCreateTodoMutation = () =>
  useMutation({
    mutationFn: async (params: CreateTodoParams) => {
      const createdTodo = await createTodo({
        ...params,
        db: supabaseClient,
      }).catch(async (error) => {
        return invalidateCache().then(() => {
          throw error;
        });
      });

      await queryClient.setQueryData(
        todosKeyFactory.getTodosByUserId(params.userId),
        (existingData: Todo[]) => [...existingData, createdTodo],
      );
    },
  });

export const useUpdateTodoMutation = () =>
  useMutation({
    mutationFn: async (params: UpdateTodoParams) => {
      const updatedTodo = await updateTodo({
        ...params,
        db: supabaseClient,
      }).catch(async (error) => {
        return invalidateCache().then(() => {
          throw error;
        });
      });

      await queryClient.setQueryData(
        todosKeyFactory.getTodosByUserId(params.userId),
        (existingData: Todo[]) =>
          existingData.map((todo) => {
            if (todo.id === updatedTodo.id) return updatedTodo;
            return todo;
          }),
      );
    },
  });

export const useDeleteTodoMutation = () =>
  useMutation({
    mutationFn: async (params: DeleteTodoParams) => {
      await deleteTodo({
        ...params,
        db: supabaseClient,
      }).catch(async (error) => {
        return invalidateCache().then(() => {
          throw error;
        });
      });

      await queryClient.setQueryData(
        todosKeyFactory.getTodosByUserId(params.userId),
        (existingData: Todo[]) =>
          existingData.filter((todo) => todo.id !== params.id),
      );
    },
  });
