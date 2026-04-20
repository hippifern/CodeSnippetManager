import type { ReactNode } from "react";

export const ContentBlock = ({
  children,
  flex = "flex-1",
}: {
  children: ReactNode;
  flex: string;
}) => {
  return (
    <div className={` ${flex}`}>
      <div className="mx-2 h-full rounded-xl">{children}</div>
    </div>
  );
};
