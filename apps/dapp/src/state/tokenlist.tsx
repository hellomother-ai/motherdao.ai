import { atom, useAtom } from "jotai";
import { TokenList } from "@axis-finance/types";
import { defaultTokenlist } from "@axis-finance/deployments";

export const tokenlistAtom = atom<TokenList[]>([defaultTokenlist]);

export const useTokenLists = () => {
  const [lists, setActiveLists] = useAtom(tokenlistAtom);

  const addList = (list: TokenList) => {
    if (!lists.some((l) => l.name === list.name)) {
      setActiveLists((prev) => [...prev, list]);
    }
  };

  const removeList = (list: TokenList) => {
    setActiveLists((prev) => prev.filter((l) => l.name !== list.name));
  };

  const toggleList = (list: TokenList, active: boolean) => {
    setActiveLists((prev) =>
      prev.map((l) => {
        if (l.name === list.name) {
          l.isActive = active;
        }
        return l;
      }),
    );
  };

  const getTokensByChainId = (chainId: number) => {
    return lists
      .filter((l) => l.isActive)
      .flatMap((t) => t.tokens)
      .filter((t) => t.chainId === chainId);
  };

  const getToken = ({
    chainId,
    address,
  }: {
    address: string;
    chainId: number | string;
  }) => {
    return lists
      .flatMap((t) => t.tokens)
      .find(
        (t) =>
          t.address.toLocaleLowerCase().includes(address.toLocaleLowerCase()) &&
          t.chainId == chainId,
      );
  };

  return {
    lists,
    addList,
    removeList,
    toggleList,
    getTokensByChainId,
    getToken,
  };
};
