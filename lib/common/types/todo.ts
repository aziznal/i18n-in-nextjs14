import { Database } from "@/supabase/database.types";

export type Todo = Database["public"]["Tables"]["todos"]["Row"];
export type NewTodo = Database["public"]["Tables"]["todos"]["Insert"];
export type UpdatedTodo = Database["public"]["Tables"]["todos"]["Update"];
