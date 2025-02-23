import { cn } from "@repo/ui";
import React from "react";

type ImageBannerProps = React.HTMLProps<HTMLDivElement> & {
  imgUrl?: string;
  isLoading?: boolean;
};

/** Renders an image as a full-width banner */
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
        className="absolute h-full w-full bg-cover bg-center"
        style={
          imgUrl
            ? {
                backgroundImage: `url(${imgUrl})`,
              }
            : {}
        }
      />
      <div className="z-10 h-full w-full">{children}</div>
    </div>
  );
}
