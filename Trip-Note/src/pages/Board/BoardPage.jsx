import React from 'react';
import Input from '../../components/commons/Input';
import Button from '../../components/commons/Button';
import Navigation from '../../components/Board/Navigation';
import PostCard from '../../components/Board/PostCard';
import { useNavigate } from 'react-router-dom';


export default function BoardPage() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/editBoard');
  };
  return (
    <section className="h-screen mt-40 w-[840px]">
      <nav className="flex items-center justify-between">
        <div className="">
          <Input variant="searchInput" />
        </div>
        <Button
          variant="roundButton"
          size="medium"
          className="bg-prime text-white border-none"
          onClick={handleButtonClick}
        >
          작성
        </Button>
      </nav>
      <div className="w-full">
        <Navigation routes={['최신순', '인기순']}>
          <PostCard />
          <p>인기글입니다.</p>
        </Navigation>
      </div>
      
    </section>
  );
}
