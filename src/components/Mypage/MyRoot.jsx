import React, { useEffect, useState } from 'react';
import useFetchRoutes from '../../Hooks/routes/useFetchRoutes';

const MyRoot = () => {
  const { routes, error, loading } = useFetchRoutes();
  const [routeData, setRouteData] = useState([]);

  useEffect(() => {
    if (routes) {
      setRouteData(routes);
    }
  }, [routes]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {routeData.length > 0 ? (
        routeData.map((route) => (
          <div
            key={route.routeId}
            style={{
              marginBottom: '20px',
              border: '1px solid #ddd',
              padding: '10px',
            }}
          >
            <h2>{route.name}</h2>
            <div>
              {route.spots.map((spot) => (
                <div key={spot.routeId} style={{ margin: '10px 0' }}>
                  <img
                    src={spot.imageUrl}
                    alt={spot.location}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                    }}
                  />
                  <div>
                    <h3>{spot.location}</h3>
                    <p>{spot.address}</p>
                    <p>{spot.region}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No routes found.</p>
      )}
    </div>
  );
};

export default MyRoot;
