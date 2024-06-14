import {useEffect, useState} from "react";
import useNextSpotRecommend from "../../Hooks/spots/useNextSpotRecommend.js";

function NextSpotRecommend({spotId}) {

  const NextSpot = useNextSpotRecommend();

  const [ lastSpot, setLastSpot ] = useState('');
  //다음 추천 여행지 리스트 (3개)
  const [nextSpotsLocations, setNextSpotsLocations] = useState([]);

  const getNextSpot = async () => {
      try {
          const response = await NextSpot(spotId);

          console.log('response: ', response);

          //nextSpots 이 없는 경우 빈배열을 저장
          const nextSpots = response.data.nextSpots;
          const nextSpotsLocations = nextSpots ? Object.entries(nextSpots).map(([spotDTOString, ratio]) => {
              // spotDTOString에서 location 필드를 추출
              const locationMatch = spotDTOString.match(/location=([^,]*)/);
              const location = locationMatch ? locationMatch[1] : "Unknown Location";
              console.log("ratio : ", ratio);
              // 비율을 백분율로 변환
              const percentage = `${(ratio * 100).toFixed(0)}%`;

              return { location, percentage };
          }) : [];

          console.log('Spot Location:', response.data.spot.location);
          console.log('Next Spots Locations:', nextSpotsLocations);

          setLastSpot(response.data.spot.location);
          setNextSpotsLocations(nextSpotsLocations);
      }catch (err){
          console.error("다음추천여행지 API error: ", err);
      }
  }

  useEffect(() => {
      getNextSpot();
  },[spotId])

  return (
    <div>
        <div>{lastSpot} 다음 추천 여행지</div>
        {nextSpotsLocations.length > 0 ? (
            nextSpotsLocations.map((spot, index) => (
                <div key={index}>
                    {index + 1}. {spot.location} : {spot.percentage}
                </div>
            ))
        ) : (
            <div>다음 여행지에 대한 데이터가 부족합니다</div>
            )}
    </div>
  );
};

export default NextSpotRecommend;