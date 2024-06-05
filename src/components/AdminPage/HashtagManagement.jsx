import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../commons/Button';
import HashtagModal from '../Modal/HashtagModal';

const HashtagManagement = () => {
  const [adminLoginId, setAdminLoginId] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('12345678');
  const [adminAuthorizationHeader, setAdminAuthorizationHeader] = useState('');
  const [hashtags, setHashtags] = useState(null);
  const [hashtagName, setHashtagName] = useState('');
  const [hashtagIndex, setHashtagIndex] = useState(null);
  const [hashtagCity, setHashtagCity] = useState(null);
  const [hashtagModalIsOpen, setHashtagModalIsOpen] = useState(false);

  useEffect(() => {
    const getAuthorization = async () => {
      try {
        const response = await axios({
          url: `http://34.64.39.102:8080/login`,
          method: 'POST',
          data: { loginId: adminLoginId, password: adminPassword },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const authorizationHeader = response.headers.authorization;
        setAdminAuthorizationHeader(authorizationHeader);

        // 로그인 성공 후 해시태그 데이터 가져오기
        const hashResponse = await axios({
          url: `http://34.64.39.102:8080/api/admin/hashtags`,
          method: 'GET',
          headers: {
            Authorization: authorizationHeader,
          },
        });
        setHashtags(hashResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAuthorization();
  }, [adminLoginId, adminPassword]);

  const submitInput = (newHashtagName, newHashtagCity) => {
    if (hashtagIndex !== null) {
      const updateInput = async () => {
        try {
          const response = await axios({
            url: `http://34.64.39.102:8080/api/admin/hashtags/update/${hashtagIndex}`,
            method: 'PATCH',
            data: { name: newHashtagName, city: `${newHashtagCity}` },
            headers: {
              'Content-Type': 'application/json',
              Authorization: adminAuthorizationHeader,
            },
          });
        } catch (error) {
          console.error('Error fetching data:', error);
          return;
        }
      };

      updateInput();

      setHashtags((prevHashtags) =>
        prevHashtags.map((hashtag) =>
          hashtag.id === hashtagIndex
            ? { ...hashtag, name: newHashtagName, city: newHashtagCity }
            : hashtag,
        ),
      );
      setHashtagName('');
      setHashtagCity(null);
      return;
    }

    const createInput = async () => {
      try {
        const response = await axios({
          url: `http://34.64.39.102:8080/api/admin/hashtags/create`,
          method: 'POST',
          data: { name: newHashtagName, city: `${newHashtagCity}` },
          headers: {
            'Content-Type': 'application/json',
            Authorization: adminAuthorizationHeader,
          },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        return;
      }
    };

    const newHashtag = createInput();

    setHashtags((prevHashtags) => [
      ...prevHashtags,
      { id: newHashtag.id, name: newHashtagName, city: newHashtagCity },
    ]);

    console.log(newHashtag);
    setHashtagName('');
    setHashtagCity(null);
  };

  const handleDeleteHashtag = (deletedHashtagIndex) => {
    const deleteHashtag = async () => {
      try {
        const response = await axios({
          url: `http://34.64.39.102:8080/api/admin/hashtags/delete/${deletedHashtagIndex}`,
          method: 'DELETE',
          headers: {
            Authorization: adminAuthorizationHeader,
          },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        return;
      }
    };

    deleteHashtag();

    setHashtags((prevHashtags) =>
      prevHashtags.filter((hashtag) => hashtag.id !== deletedHashtagIndex),
    );

    setHashtagName('');
    setHashtagCity(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">해쉬태그 관리</h2>
      {
        <>
          <table style={{ width: '100%' }}>
            <thead style={{ width: '100%' }}>
              <tr>
                <th>해시태그 이름</th>
                <th>지역 여부</th>
                <th>삭제 여부</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {hashtags !== null && hashtags.length > 0 ? (
                hashtags.map((hashtag) => (
                  <tr>
                    <th>{hashtag.name}</th>
                    <th>{hashtag.city ? 'Yes' : 'No'}</th>
                    <th>{hashtag.delete ? 'Yes' : 'No'}</th>
                    <th>
                      <Button
                        variant={'nomalButton'}
                        size={'medium'}
                        onClick={(prev) => {
                          setHashtagName(hashtag.name);
                          setHashtagIndex(hashtag.id);
                          setHashtagCity(hashtag.city);
                          setHashtagModalIsOpen(true);
                        }}
                      >
                        수정
                      </Button>
                    </th>
                    <th>
                      <Button
                        variant={'nomalButton'}
                        size={'medium'}
                        onClick={(prev) => {
                          handleDeleteHashtag(hashtag.id);
                        }}
                      >
                        삭제
                      </Button>
                    </th>
                  </tr>
                ))
              ) : (
                <tr>No hashtags found.</tr>
              )}
            </tbody>
          </table>
          <Button
            variant={'nomalButton'}
            size={'large'}
            onClick={() => {
              setHashtagModalIsOpen(true);
            }}
          >
            생성하기
          </Button>
          <HashtagModal
            isOpen={hashtagModalIsOpen}
            onRequestClose={() => {
              setHashtagModalIsOpen(false);
            }}
            submitInput={submitInput}
            hashtagName={hashtagName}
            hashtagCity={hashtagCity}
          ></HashtagModal>
        </>
      }
    </div>
  );
};

export default HashtagManagement;
