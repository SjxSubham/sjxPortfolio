const StudioIcon = ({
  size = 18,
  strokeWidth = 1.6,
  className,
  children,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    className={className}
    {...rest}
  >
    {children}
  </svg>
);

const StudioTerminalIcon = (props) => (
  <StudioIcon {...props}>
    <rect x="3.5" y="4" width="17" height="16" rx="3" />
    <path d="M7 9l3 3-3 3" />
    <path d="M12 15h5" />
    <path d="M6.5 6.5h3" />
  </StudioIcon>
);

const StudioProfileIcon = (props) => (
  <StudioIcon {...props}>
    <rect x="4" y="5" width="16" height="14" rx="3" />
    <circle cx="9" cy="10" r="2" />
    <path d="M6.5 16c1-2 4-2 5 0" />
    <path d="M14 10h4" />
    <path d="M14 13.5h3" />
  </StudioIcon>
);

const StudioSkillsIcon = (props) => (
  <StudioIcon {...props}>
    <circle cx="6" cy="7" r="2" />
    <circle cx="18" cy="7" r="2" />
    <circle cx="12" cy="18" r="2" />
    <path d="M7.6 8.6l3.2 6.2" />
    <path d="M16.4 8.6l-3.2 6.2" />
    <path d="M8 7h8" />
  </StudioIcon>
);

const StudioProjectsIcon = (props) => (
  <StudioIcon {...props}>
    <path d="M3.5 9V7.2a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2V9" />
    <path d="M3.5 9h17v8.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />
    <path d="M7 13h7" />
    <path d="M7 15.5h4" />
  </StudioIcon>
);

const StudioCodeIcon = (props) => (
  <StudioIcon {...props}>
    <path d="M7 8L4 12l3 4" />
    <path d="M17 8l3 4-3 4" />
    <path d="M10 9l4 6" />
    <path d="M11 10.2l3 1.8-3 1.8z" />
  </StudioIcon>
);

const StudioLeetCodeIcon = (props) => (
  <StudioIcon {...props}>
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <path d="M8 8h5v5h5" />
    <path d="M8 16h4" />
  </StudioIcon>
);

const StudioGithubIcon = (props) => (
  <StudioIcon {...props}>
    <circle cx="6" cy="6" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="12" cy="18" r="2" />
    <path d="M6 8v3c0 3 3 6 6 6" />
    <path d="M18 8v2c0 2-1.5 4-4 4h-2" />
  </StudioIcon>
);

const StudioMailIcon = (props) => (
  <StudioIcon {...props}>
    <rect x="4" y="6.5" width="16" height="11" rx="2" />
    <path d="M4.5 7.5l7.5 5 7.5-5" />
    <circle cx="18" cy="16.5" r="1.2" />
  </StudioIcon>
);

export {
  StudioTerminalIcon,
  StudioProfileIcon,
  StudioSkillsIcon,
  StudioProjectsIcon,
  StudioCodeIcon,
  StudioLeetCodeIcon,
  StudioGithubIcon,
  StudioMailIcon,
};
