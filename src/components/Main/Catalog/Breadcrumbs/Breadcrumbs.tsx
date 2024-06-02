import type { UIMatch } from 'react-router-dom';
import { useMatches } from 'react-router-dom';
import styles from './BreadCrumbs.module.css';
import type { ReactNode } from 'react';
interface CrumbData {
  planet?: string;
  subcategory?: string;
  productKey?: string;
}

interface CrumbFunction {
  (data: CrumbData): ReactNode;
}
interface BreadcrumbsHandler {
  crumb: CrumbFunction;
}
export function Breadcrumbs() {
  const matches: UIMatch<CrumbData, BreadcrumbsHandler>[] = useMatches() as UIMatch<
    CrumbData,
    BreadcrumbsHandler
  >[];
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));

  return (
    <ol className={styles.crumbs}>
      {crumbs.map((crumb, index) => (
        <li key={index} className={styles.crumb}>
          {crumb}
          {index !== crumbs.length - 1 && ' /'}
        </li>
      ))}
    </ol>
  );
}
