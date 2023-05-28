import { useCallback, useMemo, useState } from "react";
import { Application } from "../../api/v1/dto";
import { SearchPage } from "./ui/search-page/SearchPage";

import { AppPage } from "./ui/app-page";

export const AppsStore: React.FC = () => {
  const [application, setApplication] = useState<Application>();

  const onAppClick = useCallback(setApplication, []);

  const content = useMemo(() => {
    return application
    ? (
        <AppPage value={application} onItemClick={onAppClick} />
      )
    : <SearchPage onItemClick={onAppClick} />
  }, [application]);

  return (
    <div>
      {content}
    </div>
  );
}