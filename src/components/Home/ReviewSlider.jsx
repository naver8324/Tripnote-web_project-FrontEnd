import React from 'react';
import useMemberPosts from '../../Hooks/posts/useMemberPosts';
import Spinner from '../commons/Spinner';
import profile from '../../assets/profile.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '../commons/Button';

const ReviewSlider = () => {
  const sortOption = 'likes';
  const page = 1;
  const size = 5;

  const { posts, loading } = useMemberPosts(sortOption, page, size);
  const postsData = posts?.content || [];

  if (loading) return <Spinner />;


  // 특정 태그를 제거하는 함수
  const removeImgTags = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const imgs = doc.querySelectorAll('img');
    imgs.forEach((img) => img.remove());
    return doc.body.innerHTML;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="w-3/4 m-auto text-title">
      <h1 className="flex justify-center text-title text-3xl font-semibold">BEST 후기</h1>
      <div className="mt-20">
        <Slider {...settings}>
          {postsData.map((post) => (
            <div
              key={post.id}
              className="bg-white h-[450px] text-black rounded-xl"
            >
              <div className="h-20 bg-prime flex justify-center items-center rounded-t-xl">
                {/* <img src={profile} alt="" className="h-44 w-44 rounded-full"/> */}
                <p className="text-white text-xl font-medium line-clamp-1">
                  {post.title}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center mt-8 gap-4 p-6 h-60">
                <p
                  className="text-center line-clamp-5"
                  dangerouslySetInnerHTML={{
                    __html: removeImgTags(post.content),
                  }}
                />
              </div>
                <div className='flex flex-col items-center'>
                {/* <Button className="text-title text-medium px-4 py-1 rounded-xl border-prime shadow-sm">
                  보러가기
                  </Button> */}
                  <p className="text-xl font-medium line-clamp-1">
                    {post.nickname}
                  </p>
                </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ReviewSlider;
