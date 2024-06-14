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
import {ToastAlert} from "../commons/ToastAlert.jsx";

const HashtagManagement = () => {
  const defaultHashtagData = {
    id: null,
    name: '',
    city: true,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const { initialHashtags, refetch: refetchHashtags } = useHashtags(currentPage, 10);
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
    }
  }, [hashtagData, isDeletingHashtag, isCreatingHashtag]);

  const handleUpdateHashtag = async () => {
    try{
      const beforeUpdateName = hashtags.find((hashtag) => hashtag.id === hashtagData.id).name;
      await updateHashtag();
      ToastAlert(`${beforeUpdateName} 이 ${hashtagData.name} 로 변경되었습니다.`, 'success');
      setHashtags((prevHashtags) =>
          prevHashtags.map((hashtag) =>
              hashtag.id === hashtagData.id
                  ? { ...hashtag, ...hashtagData }
                  : hashtag,
          ),
      );
      setHashtagData({ ...defaultHashtagData });
    }catch (err){
      console.error('hashtag update failed:', err);
    }
  };

  const handleCreateHashtag = async () => {
    try{
      await createHashtag();
      ToastAlert(`${hashtagData.name} 해시태그가 생성 되었습니다.`, 'success');
      refetchHashtags();
    }catch (err){
      console.error('hashtag create failed:', err);
    }
  };

  const handleDeleteHashtag = async () => {

    try{
      await deleteHashtag();
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
      if(!hashtagData.delete){
        ToastAlert(`${hashtagData.name} 해시태그가 삭제 되었습니다.`, 'success');
        return;
      }
      ToastAlert(`${hashtagData.name} 해시태그가 복구 되었습니다.`, 'success');

    }catch (err){
      console.error('hashtag delete failed:', err);
    }

  };
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className=" flex flex-col">
      <div className="text-xl font-bold flex flex-wrap border-b border-grey p-2 mt-4 ">
          <div className="flex-1 text-center">해시태그 이름</div>
          <div className="flex-1 text-center">지역 여부</div>
          <div className="flex-1 text-center">삭제 여부</div>
          <div className="flex-1 text-center">수정</div>
          <div className="flex-1 text-center">삭제/복구</div>
      </div>
        {hashtags === null ? (
          <Spinner />
        ) : hashtags.length ? (
          hashtags.map((hashtag) => (
            <div key={hashtag.id} className="flex flex-wrap items-center justify-around border-b border-grey p-2">
              <div className="flex-1 text-center">{hashtag.name}</div>
              <div className="flex-1 text-center">{hashtag.city ? 'Yes' : 'No'}</div>
              <div className="flex-1 text-center">{hashtag.delete ? 'Yes' : 'No'}</div>
              <div className="flex-1 text-center">
                <Button
                  variant={'nomalButton'}
                  size={'medium'}
                  onClick={() => {
                    setHashtagData(hashtag);
                    setHashtagModalIsOpen(true);
                  }}>수정</Button>
              </div>
              <div className="flex-1 text-center">
                <Button
                  variant={'nomalButton'}
                  size={'medium'}
                  onClick={() => {
                    setHashtagData(hashtag);
                    setIsDeletingHashtag(true);
                  }}
                >
                  {hashtag.delete === false ? '삭제' : '복원'}
                </Button>
              </div>
            </div>
            ))
        ) : (
          <NoData message="해시태그가 없습니다." />
        )}
        <div className="mt-10"></div>
        <Pagination
        currentPage={currentPage}
        totalPage={Math.ceil(
          initialHashtags
            ? initialHashtags.totalElements / initialHashtags.pageable.pageSize : 5,
        )}
        onPageChange={handlePageChange}
      />
      <div className="mt-4">
        <Button
          className="min-w-[250px]"
          variant={'nomalButton'}
          size={'large'}
          onClick={() => {
            setHashtagModalIsOpen(true);
          }}
        >
          생성하기
        </Button>
      </div>
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
