import React, { useEffect } from 'react';
import ProfileSet from '../../components/ProfileSet';
import usePasswordCheckStore from '../../store/usePasswordCheckStore';

export default function ProfilePage() {
  const setPasswordChecked = usePasswordCheckStore(
    (state) => state.setPasswordChecked,
  );

  useEffect(() => {
    return () => {
      setPasswordChecked(false);
    };
  }, [setPasswordChecked]);

  return (
    <div className="mt-40 mb-40 w-[1000px]">
      <ProfileSet />
    </div>
  );
}
