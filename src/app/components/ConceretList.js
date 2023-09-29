import ConcertItem from "./ConcertItem";
import styles from "../ConcertList.module.css";

const ConcertList = ({ list }) => {
  return (
    <div className={styles.ConcertListBlock}>
      {list.map((item) => (
        <ConcertItem key={item.mt20id._text} item={item} />
      ))}
    </div>
  );
};

export default ConcertList;
