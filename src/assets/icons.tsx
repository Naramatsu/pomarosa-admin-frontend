import { useId, type SVGProps } from "react";

export const UploadCloud: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = "60", colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        fill={`url(#${gradientId})`}
        d="m12 12.586l4.243 4.242l-1.415 1.415L13 16.415V22h-2v-5.587l-1.828 1.83l-1.415-1.415zM12 2a7 7 0 0 1 6.954 6.194A5.5 5.5 0 0 1 18 18.978v-2.014a3.5 3.5 0 1 0-1.111-6.91a5 5 0 1 0-9.777 0a3.5 3.5 0 0 0-1.292 6.88l.18.03v2.014a5.5 5.5 0 0 1-.954-10.784A7 7 0 0 1 12 2"
      />
    </svg>
  );
};

export const BackArrow: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: string;
  }
> = ({ size = 36, colors = "#000", ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors} />
          <stop offset="100%" stopColor={colors} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="m7.85 13 2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
      />
    </svg>
  );
};

export const CheckIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 12.5l2.5 2.5L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const InfoIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <line
        x1="12"
        y1="10"
        x2="12"
        y2="16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7" r="1" fill="currentColor" />
    </svg>
  );
};

export const ErrorIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9 9l6 6M15 9l-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
