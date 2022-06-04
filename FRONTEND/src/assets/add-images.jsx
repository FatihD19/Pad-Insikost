import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="37"
      height="36"
      fill="none"
      viewBox="0 0 37 36"
    >
      <g filter="url(#filter0_d)">
        <ellipse
          cx="18.5"
          cy="13.965"
          fill="#5BB6FC"
          rx="10.5"
          ry="9.953"
        ></ellipse>
        <g fill="#fff" clip-path="url(#clip0)">
          <path d="M18.501 12.04c-1.414 0-2.564 1.09-2.564 2.429 0 1.34 1.15 2.43 2.564 2.43 1.413 0 2.563-1.09 2.563-2.43s-1.15-2.43-2.563-2.43zm0 4.081c-.961 0-1.743-.74-1.743-1.652 0-.911.782-1.652 1.743-1.652.961 0 1.743.74 1.743 1.652 0 .911-.782 1.652-1.743 1.652z"></path>
          <path d="M22.52 10.872h-1.51a.128.128 0 01-.112-.064l-.418-.832-.003-.007a.95.95 0 00-.848-.496H17.4a.95.95 0 00-.848.496c0 .003-.002.005-.003.007l-.418.832a.128.128 0 01-.112.064H14.48c-.679 0-1.231.524-1.231 1.167v5.248c0 .644.552 1.167 1.23 1.167h8.04c.678 0 1.23-.523 1.23-1.167V12.04c0-.643-.552-1.167-1.23-1.167zm.41 6.415a.4.4 0 01-.41.39h-8.04a.4.4 0 01-.41-.39V12.04a.4.4 0 01.41-.39h1.539a.95.95 0 00.847-.496l.004-.007.417-.831a.128.128 0 01.113-.065h2.229c.048 0 .09.025.113.065l.417.831.004.007a.95.95 0 00.848.497h1.509a.4.4 0 01.41.389v5.248z"></path>
          <path d="M22.11 12.426h-.82v.777h.82v-.777z"></path>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d"
          width="37"
          height="35.906"
          x="0"
          y="0.012"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="4"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0.25098 0 0 0 0 0.25098 0 0 0 0 0.25098 0 0 0 0.08 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          ></feBlend>
        </filter>
        <clipPath id="clip0">
          <path fill="#fff" d="M13.25 8.988H23.75V18.941H13.25z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default Icon;
