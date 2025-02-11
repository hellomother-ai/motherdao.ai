import { DownloadIcon } from "lucide-react";
import { CSVLink } from "react-csv";
import { Tooltip } from "@repo/ui";

type CSVDownloaderProps = {
  data: string[][];
  headers: string[];
  filename?: string;
  tooltip?: string;
};

/**
 * Renders a download button capable of
 * downloading an array of strings as csv */
export function CSVDownloader(props: CSVDownloaderProps) {
  return (
    <Tooltip
      content={props.tooltip ?? "Download this table's data in CSV format"}
    >
      <CSVLink
        target="_blank"
        filename={props.filename}
        headers={props.headers}
        data={props.data}
      >
        <DownloadIcon />
      </CSVLink>
    </Tooltip>
  );
}
