import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BookFormType, BookType } from "./schema";

export function useBooks(){
  return useQuery({
    queryKey: ["book"],
    queryFn: async () => {
      const res = await axios.get("/api/book");
      return res.data as BookType[];
    }
  });
}

export function useEditBook(){
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookId, ...data }: BookType) => await axios.put(`/api/book/${bookId}`, data),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["book"]
    })
  });
}

export function useAddBook(){
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BookFormType) => await axios.post("/api/book", data),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["book"]
    })
  });
}

export function useDeleteBook(){
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookId: string) => await axios.delete(`/api/book/${bookId}`),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["book"]
    })
  });
}