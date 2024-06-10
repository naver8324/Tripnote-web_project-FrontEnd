import React, { useEffect, useState } from 'react';
import Button from '../commons/Button';
import HashtagModal from '../Modal/HashtagModal';
import useHashtags from '../../Hooks/admin/useHashtags';
import Spinner from '../commons/Spinner';
import NoData from '../../pages/Board/NoData';
import Pagination from '../commons/Pagination';
import useChangingHashtag from '../../Hooks/admin/useChangingHashtag';
import useCreatingHashtag from '../../Hooks/admin/useCreatingHashtag';
import useDeletingHashtag from '../../Hooks/admin/useDeletingHashtag';

const HashtagManagement = () => {
  const defaultHashtagData = {
    id: null,
    name: '',
    city: true,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const { initialHashtags } = useHashtags(currentPage, 10);
  const [hashtagData, setHashtagData] = useState({ ...defaultHashtagData });

  const [hashtags, setHashtags] = useState(null);
  const [hashtagModalIsOpen, setHashtagModalIsOpen] = useState(false);

  const { refetch: updateHashtag } = useChangingHashtag(hashtagData);
  const { refetch: deleteHashtag } = useDeletingHashtag(hashtagData);
  const [isDeletingHashtag, setIsDeletingHashtag] = useState(false);
  const [isCreatingHashtag, setIsCreatingHashtag] = useState(false);

  const { response: createHashtagData, refetch: createHashtag } =
    useCreatingHashtag(hashtagData);

  useEffect(() => {
    if (initialHashtags && initialHashtags.content) {
      setHashtags(initialHashtags.content);
    }
  }, [initialHashtags]);

  useEffect(() => {
    if (isDeletingHashtag) {
      handleDeleteHashtag();
      setIsDeletingHashtag(false);
      setHashtagData(defaultHashtagData);
      return;
    }

    if (isCreatingHashtag) {
      handleCreateHashtag();
      setIsCreatingHashtag(false);
      setHashtagData(defaultHashtagData);
    }
  }, [hashtagData, isDeletingHashtag, isCreatingHashtag]);

  useEffect(() => {
    if (initialHashtags && initialHashtags.content && createHashtagData) {
      setHashtags((prevHashtags) => [...prevHashtags, createHashtagData]);
    }
  }, [createHashtagData]);

  const handleUpdateHashtag = async () => {
    updateHashtag();
    setHashtags((prevHashtags) =>
      prevHashtags.map((hashtag) =>
        hashtag.id === hashtagData.id
          ? { ...hashtag, ...hashtagData }
          : hashtag,
      ),
    );
    setHashtagData({ ...defaultHashtagData });
  };

  const handleCreateHashtag = () => {
    createHashtag();
  };

  const handleDeleteHashtag = async () => {
    deleteHashtag();
    setHashtags((prevHashtags) =>
      prevHashtags.map((hashtag) =>
        hashtag.id === hashtagData.id
          ? {
              ...hashtag,
              delete: !hashtag.delete,
            }
          : hashtag,
      ),
    );
  };

  const renderHashtags = () => {
    return hashtags.map((hashtag) => (
      <tr>
        <th>{hashtag.name}</th>
        <th>{hashtag.city ? 'Yes' : 'No'} </th>
        <th>{hashtag.delete ? 'Yes' : 'No'}</th>
        <th>
          <Button
            variant={'nomalButton'}
            size={'medium'}
            onClick={() => {
              setHashtagData(hashtag);
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
            onClick={() => {
              setHashtagData(hashtag);
              setIsDeletingHashtag(true);
            }}
          >
            {!hashtag.delete ? '삭제' : '복원'}
          </Button>
        </th>
      </tr>
    ));
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-10 mb-10">해쉬태그 관리</h2>

      <table className="mb-10" style={{ width: '100%' }}>
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
          {hashtags === null ? (
            <Spinner />
          ) : hashtags.length > 0 ? (
            renderHashtags()
          ) : (
            <NoData message="해시태그가 없습니다." />
          )}
        </tbody>
      </table>
        <Pagination
        currentPage={currentPage}
        totalPage={Math.ceil(
          initialHashtags
            ? initialHashtags.totalElements / initialHashtags.pageable.pageSize : 5,
        )}
        onPageChange={handlePageChange}
      />
      <Button
        className="mt-10"
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
        hashtagData={hashtagData}
        setHashtagData={setHashtagData}
        setIsCreatingHashtag={setIsCreatingHashtag}
        handleUpdateHashtag={handleUpdateHashtag}
      ></HashtagModal>
    </div>
  );
};

export default HashtagManagement;
