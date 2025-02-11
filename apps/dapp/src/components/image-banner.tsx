import { cn } from "@repo/ui";
import React from "react";

type ImageBannerProps = React.HTMLProps<HTMLDivElement> & {
  imgUrl?: string;
  isLoading?: boolean;
};

/** Renders an image blurred as a banner with a gradient */
export function ImageBanner({
  imgUrl,
  children,
  isLoading,
  ...props
}: ImageBannerProps) {
  return (
    <div
      className={cn(
        "relative flex h-[480px] w-full items-end justify-center",
        (isLoading || !imgUrl) && "loading-gradient items-center",
        props.className,
      )}
    >
      <div
        className={cn(
          "saturate-75 absolute h-[480px] w-[150%] blur-md lg:block",
          !isLoading && "bg-center",
        )}
        style={
          imgUrl
            ? {
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: "200% 480px",
                clipPath: "inset(0 0 0 0)",
              }
            : {}
        }
      />
      <div
        className="absolute h-full w-dvw bg-center bg-no-repeat "
        style={
          imgUrl
            ? {
                backgroundSize: "auto 480px",
                backgroundImage: `url(${imgUrl})`,
              }
            : {}
        }
      />
      <div className="z-10 h-full w-full">{children}</div>
    </div>
  );
}
