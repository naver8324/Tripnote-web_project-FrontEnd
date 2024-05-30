import React, { useState } from 'react';
import Input from '../../components/commons/Input';
import Button from '../../components/commons/Button';
import Navigation from '../../components/Board/Navigation';
import PostCard from '../../components/Board/PostCard';
import { useNavigate } from 'react-router-dom';

const mockRegionsTags = [
  '전체',
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
  '경기',
  '강원',
  '충북',
  '충남',
  '경북',
  '경남',
  '전북',
  '전남',
  '제주',
];

const mockThemeTags = [
  '혼자여행',
  '가족과함께',
  '맛집',
  '자연',
  '체험',
  '트레킹',
  '쇼핑',
];

export default function BoardPage() {
  const [pageState, setPageState] = useState('#전체');

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/editBoard');
  };

  const loadPostByTag = (e) => {
    const tag = e.target.innerText;
    if (pageState === tag) {
      setPageState('#전체');
    } else {
      setPageState(tag);
    }
  };

  return (
    <section className="min-h-screen mt-40 w-[840px] mx-auto flex flex-col text-title">
      <nav className="flex items-center justify-between w-full mb-8">
        <h1 className="searchResult text-3xl font-semibold">{pageState}</h1>
        <Input variant="searchInput" />
      </nav>
      <div className="flex flex-1 w-full mb-16">
        <div className="flex-1 pr-4">
          <Navigation routes={['최신순', '인기순']}>
            <PostCard />
            <p>인기글입니다.</p>
          </Navigation>
        </div>
        <div className="min-w-[40%] lg:min-w-[255px] max-w-min border-l border-t border-grey pl-8 pt-8 mt-[87px] max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-m mb-6">지역별 후기</h1>
              <div className="flex gap-3 flex-wrap">
                {mockRegionsTags.map((region, i) => (
                  <Button
                    variant="roundButton"
                    size="small"
                    key={i}
                    className={`text-xs px-2 ${pageState === region ? 'bg-title text-white' : ''}`}
                    onClick={loadPostByTag}
                  >
                    #{region}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h1 className="font-medium text-m mb-6">테마별 후기</h1>
              <div className="flex gap-3 flex-wrap">
                {mockThemeTags.map((theme, i) => (
                  <Button
                    variant="roundButton"
                    size="small"
                    key={i}
                    className={`text-xs px-2 ${pageState === theme ? 'bg-title text-white' : ''}`}
                    onClick={loadPostByTag}
                  >
                    #{theme}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
