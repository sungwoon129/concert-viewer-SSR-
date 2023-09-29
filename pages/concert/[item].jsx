import { useRouter } from "next/router"; // query parameter 을 사용하기 위해 next의 router 패키지의 useRouter를 가져온다.
import ConcertItem from "../../src/app/components/ConcertItem";

const Item = () => {
  const router = useRouter();

  // router의 url 쿼리에 존재하는 user 의 값을 가져온다. 이는 [user].jsx의 user와 대응된다.
  const { item } = router.query;

  return (
  <ConcertItem/>
);
};

export default Item;