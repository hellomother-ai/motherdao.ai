import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  Button,
} from "@repo/ui";
import { environment } from "utils/environment";
import { ReachOutMessage } from "modules/app/reach-out";
import { ErrorResponse, Link, useRouteError } from "react-router-dom";

const showError = !environment.isProduction;

/** Error boundary to inform users */
export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse & Error & { error?: Error };

  const name = error?.error?.name ?? error?.name;
  const message = error?.error?.message ?? error?.message;
  const stack = error?.error?.stack ?? error?.stack;
  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `Name: ${name} ## Message: ${message} ## Stacktrace: ${stack}`,
    );
  };

  return (
    <div
      id="__AXIS_ERROR_PAGE__"
      className="flex h-screen flex-col items-center justify-center"
    >
      <div id="error-page" className="text-center">
        <h1>Oops!</h1>
        <p className="mt-2">Something has gone wrong...</p>

        {showError && stack && (
          <AccordionRoot collapsible type="single">
            <AccordionItem
              value={"item-0"}
              className="flex flex-col justify-center"
            >
              <AccordionTrigger className="justify-center gap-x-1">
                Show error details
              </AccordionTrigger>
              <AccordionContent className="space-y-3">
                <p className="max-w-md">
                  <code>{stack}</code>
                </p>

                <Button onClick={() => handleCopy()} className="mt-4 uppercase">
                  Copy Error Details
                </Button>
              </AccordionContent>
            </AccordionItem>
          </AccordionRoot>
        )}

        <ReachOutMessage />

        <Button className="mt-4" variant="secondary" size="sm">
          <Link to="/">Head back</Link>
        </Button>
      </div>
    </div>
  );
}
