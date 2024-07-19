import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

export type WarningContextType = {
  warningList: [Warning[], React.Dispatch<React.SetStateAction<Warning[]>>];
};

export type Warning = {
  id: number;
  type: "warning" | "error";
  text: string;
};

export const WarningContext = createContext<WarningContextType | undefined>(
  undefined
);

const WarningContextProvider = ({ children }: PropsWithChildren) => {
  const value = { warningList: useState<Warning[]>([]) };

  // const deleteFirstItem = () => {
  //   const deleteTimer = setTimeout(() => {
  //     value.warningList[1]((oldValue) => {
  //       const newArray = oldValue.map((item) => item);
  //       if (value.warningList[0][0]) {
  //         console.log("srabotalo", newArray[0]);
  //         newArray.shift();
  //       }
  //       return newArray;
  //     });
  //     clearTimeout(deleteTimer);
  //   }, 3000);
  // };

  // useEffect(() => {
  //   if (value.warningList[0].length > 0) {
  //     deleteFirstItem();
  //   }
  // }, []);

  return (
    <WarningContext.Provider value={value}>{children}</WarningContext.Provider>
  );
};

export default WarningContextProvider;
