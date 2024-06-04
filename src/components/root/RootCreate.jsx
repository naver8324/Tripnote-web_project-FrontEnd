import Input from '../commons/Input';

export default function RootCreate() {
  return (
    <>
      <form className="relative mt-4 flex">
        <Input variant="searchInput" placeholder="여행지를 검색해보세요!" />
      </form>
    </>
  );
}
