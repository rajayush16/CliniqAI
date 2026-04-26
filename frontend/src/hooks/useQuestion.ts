import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { askQuestion, getHistory, getQuestion } from "../services/questions";

export function useAskQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: askQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}

export function useHistory() {
  return useQuery({ queryKey: ["history"], queryFn: getHistory });
}

export function useQuestion(id?: string) {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestion(id ?? ""),
    enabled: Boolean(id),
  });
}

