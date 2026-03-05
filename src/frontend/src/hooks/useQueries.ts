import { useMutation } from "@tanstack/react-query";
import type { Category } from "../backend.d";
import { useActor } from "./useActor";

export function useSubmitInquiry() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
      productInterest,
    }: {
      name: string;
      email: string;
      message: string;
      productInterest: Category;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.submitInquiry(name, email, message, productInterest);
    },
  });
}
