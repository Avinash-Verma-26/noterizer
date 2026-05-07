import { createContext, useEffect, type ReactNode } from "react";

export const HomepageContext = createContext<null>(null);

export const HomePageProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const getUserData = async () => {
      try {
      } catch (err) {
        console.log(err);
      }
    };
  }, []);
};
