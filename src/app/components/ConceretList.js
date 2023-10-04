import ConcertItem from "./ConcertItem";
import styles from "../style/ConcertList.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";

const ConcertList = ({ list, pageNumber }) => {
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef();
  const router = useRouter();

  useEffect(() => {
    if (list) {
      if (list.length === 0) {
        // 에러표시
        console.error("데이터 없음");
      } else {
        // 마지막 페이지 비교해서 더 불러올게 있는지 처리
        if (list.length === 9) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      }
    }
  }, [list]);

  // 페이지네이션 처리
  const handlePagination = (page) => {
    const path = router.pathname;
    const query = router.query;
    query.page = parseInt(page, 10) + 1;
    router.push(
      {
        pathname: path,
        query: query,
      },
      undefined,
      { scroll: false }
    );
  };

  // 마지막 요소 화면에 등장하면 페이지네이션 처리 발동
  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handlePagination(pageNumber);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, handlePagination]
  );

  return (
    <div className={styles.ConcertListBlock}>
      {list.map((item, index) => (
        <ConcertItem
          key={item.mt20id._text}
          item={item}
          ref={list.length === index + 1 ? lastElementRef : null}
        />
      ))}
    </div>
  );
};

export default ConcertList;
