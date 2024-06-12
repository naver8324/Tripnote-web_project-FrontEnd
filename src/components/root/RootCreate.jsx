import Selector from '../Home/Selector';
import RootCreateSpotList from '../rootCreateSpotList/RootCreateSpotList';

export default function RootCreate() {
  return (
    <>
      {/* <div className="flex">
        <Selector /> */}

      <RootCreateSpotList region="SEOUL" />
      {/* </div> */}
    </>
  );
}
