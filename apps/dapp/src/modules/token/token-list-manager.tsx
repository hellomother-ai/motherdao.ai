import React from "react";
import { Avatar, Input, Skeleton, Switch } from "@repo/ui";
import type { TokenList } from "@axis-finance/types";
import { useTokenLists } from "state/tokenlist";
import { useGetTokenList } from "loaders/use-get-tokenlist";

export function TokenListManager() {
  const [url, setUrl] = React.useState<string>();
  const tokenlists = useTokenLists();
  const listQuery = useGetTokenList(url);

  return (
    <div>
      <Input
        placeholder="https://yo.ur/list.json"
        onChange={(e) => setUrl(e.target.value)}
      />
      {listQuery.error && (
        <p className="text-destructive text-xs">Something went wrong</p>
      )}
      <div className="mt-4 flex flex-col gap-y-2">
        {tokenlists.lists.map((t, i) => (
          <TokenListDisplay
            key={i}
            tokenList={t}
            onToggle={tokenlists.toggleList}
          />
        ))}
        {listQuery.isLoading && <Skeleton className="h-14 w-full" />}
      </div>
    </div>
  );
}

type TokenListDisplayProps = {
  tokenList: TokenList;
  onToggle: (tokenlist: TokenList, active: boolean) => void;
};

function TokenListDisplay({ tokenList, ...props }: TokenListDisplayProps) {
  return (
    <div className="bg-secondary flex items-center justify-between gap-x-2 rounded-sm p-4 py-2">
      <div className="flex items-center gap-x-2">
        <Avatar
          className="size-10"
          src={tokenList.logoURI}
          alt={tokenList.name}
        />

        <div className="flex flex-col">
          <p>{tokenList.name}</p>
          <div className="flex items-center">
            <p className="text-muted-foreground text-xs">
              {tokenList.tokens.length} Tokens{" "}
            </p>
          </div>
        </div>
      </div>

      <Switch
        checked={tokenList.isActive}
        onCheckedChange={(active) => props.onToggle(tokenList, active)}
      />
    </div>
  );
}
