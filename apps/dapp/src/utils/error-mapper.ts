const CAUSE_MAP = {
  TRANSFER_FROM_FAILED: {
    name: "Failed to transfer funds",
    message:
      "The contract was unable to transfer your token. This is likely caused by approving an incorrect amount or not approving at all. Try restarting your interaction, ensuring you approve the correct amount.",
  },
};

type ContractError = {
  cause?: {
    reason?: string;
  };
};

export function getCustomException(error?: Error & ContractError) {
  if (!error) return;

  const cause = error?.cause?.reason ?? "";
  //@ts-expect-error TODO: fix types here
  const descriptiveError = CAUSE_MAP[cause];

  if (descriptiveError) {
    descriptiveError.original = error;
  }

  return descriptiveError ?? error;
}
