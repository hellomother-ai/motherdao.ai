import { useQuery } from "@tanstack/react-query";
import { validateTokenlist } from "src/utils/tokenlist";
import { TokenList } from "@axis-finance/types";
import { z } from "zod";
import { useTokenLists } from "state/tokenlist";

const url = z.string().url().endsWith(".json");

export function useGetTokenList(path?: string) {
  const tokenlist = useTokenLists();
  return useQuery({
    queryKey: [path],
    enabled: !!path && url.safeParse(path).success,
    queryFn: async () => {
      const response = await fetch(path!);
      const list: TokenList = await response.json();
      validateTokenlist(list); //Throws error on invalid list

      tokenlist.addList({ ...list, isActive: true });

      return list;
    },
  });
}
