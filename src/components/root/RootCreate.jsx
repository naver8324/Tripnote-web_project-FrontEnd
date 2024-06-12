import Selector from '../Home/Selector';
import RootCreateSpotList from '../rootCreateSpotList/RootCreateSpotList';
import useRegionSearchStore from '../../store/useRegionSearchStore';

const regionMap = {
  서울: 'SEOUL',
  인천: 'INCHEON',
  부산: 'BUSAN',
  대구: 'DAEGU',
  울산: 'ULSAN',
  광주: 'GWANGJU',
  대전: 'DAEJEON',
  세종: 'SEJONG',
  경기: 'GYEONGGI',
  강원: 'GANGWON',
  충북: 'CHUNGBUK',
  충남: 'CHUNGNAM',
  경북: 'GYEONGBUK',
  경남: 'GYEONGNAM',
  전북: 'JEONBUK',
  전남: 'JEONNAM',
  제주: 'JEJU',
};

export default function RootCreate() {
  const selectedRegion = useRegionSearchStore((state) => state.selectedRegion);
  const regionCode = regionMap[selectedRegion] || 'SEOUL';
  return (
    <>
      <RootCreateSpotList region={regionCode} />
    </>
  );
}
