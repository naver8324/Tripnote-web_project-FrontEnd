import { useEffect, useState } from 'react';
import useNextSpotRecommend from '../../Hooks/spots/useNextSpotRecommend.js';

function NextSpotRecommend({ spotId }) {
  const NextSpot = useNextSpotRecommend();

  const [lastSpot, setLastSpot] = useState('');
  const [nextSpotsLocations, setNextSpotsLocations] = useState([]);

  const getNextSpot = async () => {
    try {
      const response = await NextSpot(spotId);


      const nextSpots = response.data.nextSpots;
      const nextSpotsLocations = nextSpots
        ? Object.entries(nextSpots).map(([spotDTOString, ratio]) => {
            const locationMatch = spotDTOString.match(/location=([^,]*)/);
            const location = locationMatch
              ? locationMatch[1]
              : 'Unknown Location';
            const percentage = (ratio * 100).toFixed(1); // 소숫점 첫째 자리까지 반올림

            return { location, percentage };
          })
        : [];


      setLastSpot(response.data.spot.location);
      setNextSpotsLocations(nextSpotsLocations);
    } catch (err) {
      console.error('다음추천여행지 API error: ', err);
    }
  };

  useEffect(() => {
    getNextSpot();
  }, [spotId]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">
        {lastSpot} <br></br>다음 추천 여행지
      </h2>
      {nextSpotsLocations.length > 0 ? (
        <div className="space-y-4">
          {nextSpotsLocations.map((spot, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg">{spot.location}</span>
                <span className="text-sm font-bold">{spot.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${spot.percentage}%`,
                    backgroundColor: '#1DC078', // prime 색상 지정
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          다음 여행지에 대한 데이터가 부족합니다
        </div>
      )}
    </div>
  );
}

export default NextSpotRecommend;
