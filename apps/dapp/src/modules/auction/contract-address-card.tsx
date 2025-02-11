import { BlockExplorerLink } from "components/blockexplorer-link";
import { Address } from "viem";

type ContractAddressCard = {
  addresses: Array<[string, Address]>;
  chainId: number;
} & React.HTMLAttributes<HTMLDivElement>;

export function ContractAddressCard({
  addresses,
  chainId,
  ...props
}: ContractAddressCard) {
  if (!chainId) throw new Error("No chainId provided");

  return (
    <div {...props}>
      <h3>Contract Addresses</h3>
      <div className="mt-2">
        {addresses.map(([name, address]) => (
          <div key={`${name}-${address}`}>
            <p className="flex gap-x-1">
              {name}: <BlockExplorerLink chainId={chainId} address={address} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
