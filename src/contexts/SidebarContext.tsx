import type { Children } from "@/lib/types";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => { }
});

export const SidebarProvider = ({ children }: { children: Children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <SidebarContext.Provider value={{
      isOpen,
      setIsOpen
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext);
