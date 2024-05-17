import { PropsWithChildren } from "react";
import { Navbar } from "../Navbar";

export const PageShell: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {children}
      </div>
    </main>
  );
};
