import styles from "./link.module.scss";

export default function ExtLink({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <a href={url} className={styles.link}>
      {children}
    </a>
  );
}
