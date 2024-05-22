import { Route, Routes, Navigate } from 'react-router-dom';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
}
