import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export function useAuthUser() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: () => new Promise((res) => {
      const unsub = onAuthStateChanged(auth, (u) => { unsub(); res(u); });
    }),
    staleTime: 1000 * 60 * 10,
  });
}