import type { WarningContextType } from "contexts/WarningContext";
import type { Warning } from "contexts/WarningContext";

export function CreateWarning(
  warning: Warning,
  warningContextData: WarningContextType
) {
  warningContextData?.warningList[1]((oldValue) => {
    const newArray = oldValue.map((item) => item);
    newArray.push(warning);
    return newArray;
  });

  const deleteTimer = setTimeout(() => {
    warningContextData.warningList[1]((oldValue) => {
      const newArray = oldValue.map((item) => item);
      newArray.shift();
      return newArray;
    });
    clearTimeout(deleteTimer);
  }, 3000);
}
