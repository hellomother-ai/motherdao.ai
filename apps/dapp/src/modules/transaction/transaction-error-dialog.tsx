import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  Button,
} from "@repo/ui";
import { ReachOutMessage } from "modules/app/reach-out";
import { getCustomException } from "utils/error-mapper";

export function TransactionErrorDialog(props: { error: Error }) {
  const error = getCustomException(props.error);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `Name: ${props.error.name} ## Message: ${props.error.message} ## Stacktrace: ${props.error.stack}`,
    );
  };

  return (
    <div className="flex flex-col items-center gap-y-2">
      <p>Something went wrong with your transaction:</p>
      <div className="mt-2 flex flex-col items-center">{error?.name}</div>
      <AccordionRoot collapsible type="single">
        <AccordionItem
          value={"item-0"}
          className="flex flex-col justify-center"
        >
          <AccordionTrigger className="justify-center gap-x-1">
            Show error details
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            <p className="max-w-md">{error.message}</p>

            <Button onClick={() => handleCopy()} className="mt-4 uppercase">
              Copy Error Details
            </Button>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
      <ReachOutMessage className="mt-2" />
    </div>
  );
}
