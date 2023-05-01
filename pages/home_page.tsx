import Filter from "../utils/filter_component";

export default function MyPage() {
  function handleSubmitFilter(filter: { selectedSports: string[]; distance: number }) {
    console.log(filter);
    // do something with the filter
  }

  return (
    <div>
      <h1>GymMate Home Page</h1>
      <Filter />
    </div>
  );
}