import Link from "next/link";

import styles from "./link.module.scss";

export default function NextLink({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={url}>
      <a className={styles.link}>{children}</a>
    </Link>
  );
}
