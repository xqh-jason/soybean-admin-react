import { useTitle } from 'ahooks';
import { useEffect } from 'react';
import { Outlet, useMatches } from 'react-router-dom';

const Layout = () => {
  const matches = useMatches();

  const { t } = useTranslation();

  const [documentTitle, setDocumentTitle] = useState(import.meta.env.VITE_APP_TITLE);

  useTitle(documentTitle);

  useEffect(() => {
    const { i18nKey, title } = matches.at(-1)?.handle;

    const finalTitle = i18nKey ? t(i18nKey) : title;

    setDocumentTitle(finalTitle);
  }, [matches, t]);

  return <Outlet />;
};

export default Layout;
