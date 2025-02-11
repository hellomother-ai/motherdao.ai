import { useTheme } from "@repo/ui";

export default function AxisIcon() {
  const { themeColor } = useTheme();
  const fill = themeColor === "dark" ? "#ffffff" : "#252026";

  return (
    <svg
      width="55"
      height="46"
      viewBox="0 0 194 168"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.308594 152.657L8.89073 167.342L88.4185 121.571V160.477H105.392V121.571L185.111 167.342L193.693 152.657L114.165 106.695L147.349 87.6238L138.767 72.7481L105.392 92.0102L105.583 0.658203H88.4185V92.0102L55.2342 72.7481L46.6521 87.6238L79.8363 106.695L0.308594 152.657Z"
        fill={fill}
      />
    </svg>
  );
}
