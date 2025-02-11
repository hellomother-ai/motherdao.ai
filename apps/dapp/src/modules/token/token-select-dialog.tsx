import { Token } from "@axis-finance/types";
import {
  Button,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogInputChangeHandler,
  DialogStatusChangeHandler,
  DialogTitle,
  IconedLabel,
  ScrollArea,
  Tooltip,
  trimAddress,
} from "@repo/ui";
import React from "react";
import { TokenListManager } from "./token-list-manager";
import { ArrowLeftIcon } from "lucide-react";
import { useTokenLists } from "state/tokenlist";
import isDeepEqual from "node_modules/@repo/ui/src/helpers/is-deep-equal";

type TokenSelectDialogProps = {
  chainId: number;
  onChange?: DialogInputChangeHandler<Token>;
  setDialogOpen?: DialogStatusChangeHandler;
  value?: Token;
};

/** Shows a list of tokens per chain and a way to manage tokenlists*/
export function TokenSelectDialog(props: TokenSelectDialogProps) {
  const { getTokensByChainId } = useTokenLists();
  const [token, setToken] = React.useState<Token>();
  const [isManaging, setIsManaging] = React.useState(false);

  const tokens = getTokensByChainId(props.chainId);

  const handleSelect = (value: Token) => {
    setToken(value);
    props.onChange?.(value, {
      imgURL: value.logoURI,
      label: value.symbol,
      value: value.symbol,
    });
  };

  React.useEffect(() => {
    if (props.value && !isDeepEqual(props.value, token)) {
      handleSelect(props.value);
    }
  }, [props.value]);

  return (
    <>
      {isManaging ? (
        <DialogContent className="bg-surface max-w-sm">
          <DialogHeader className="flex-row items-center gap-x-2">
            <Button
              onClick={() => setIsManaging(false)}
              size="icon"
              variant="ghost"
              className="size-6"
            >
              <ArrowLeftIcon />
            </Button>
            <DialogTitle>Manage Tokenlists</DialogTitle>
          </DialogHeader>
          <TokenListManager />
        </DialogContent>
      ) : (
        <DialogContent className="bg-surface max-w-sm">
          <DialogHeader>
            <DialogTitle>Select Token</DialogTitle>
          </DialogHeader>
          <div>
            <ScrollArea className="max-h-[300px]">
              {tokens
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((t, i) => (
                  <Button
                    key={i}
                    variant="secondary"
                    size="lg"
                    className="block w-full rounded-none border-x border-b-0 border-t px-2 first:rounded-t-sm last:rounded-b-sm last:border-b"
                    onClick={() => {
                      handleSelect(t);
                      props.setDialogOpen?.(false);
                    }}
                  >
                    <TokenSelectRow token={t} />
                  </Button>
                ))}
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsManaging(true);
              }}
            >
              Manage Tokenlists
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </>
  );
}

/** Displays token symbol, logo and contract address*/
function TokenSelectRow({ token }: { token: Token }) {
  const isLongSymbol = token.symbol.length > 7;
  const label = isLongSymbol
    ? `${token.symbol.substring(0, 6)}...`
    : token.symbol;
  return (
    <div className="flex items-center justify-between gap-x-2 p-1 ">
      <Tooltip content={isLongSymbol && token.symbol}>
        <IconedLabel src={token.logoURI} label={label} />
        <p className="text-xs">{trimAddress(token.address, 8)}</p>
      </Tooltip>
    </div>
  );
}
