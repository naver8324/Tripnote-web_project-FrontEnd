import React, { useEffect, useState } from 'react';
import Input from '../../components/commons/Input';
import Button from '../../components/commons/Button';
import Navigation from '../../components/Board/Navigation';
import PostCard from '../../components/Board/PostCard';
import { useNavigate } from 'react-router-dom';
import useMemberPosts from '../../Hooks/posts/useMemberPosts';
import { ToastAlert } from '../../components/commons/ToastAlert';
import useHashTag from '../../Hooks/posts/useHashTag';
import Spinner from '../../components/commons/Spinner';
import NoData from './NoData';
import Pagination from '../../components/commons/Pagination';
import useSearchByTag from '../../Hooks/posts/useSearchByTag';

export default function BoardPage() {
  const [pageState, setPageState] = useState('#전체');
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('최신순');
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, error, loading, refetch } = useMemberPosts(
    sortOption,
    currentPage,
    4,
  );
  const [localPosts, setLocalPosts] = useState(null);
  const { Hashtags: regionTags } = useHashTag(true);
  const { Hashtags: themeTags } = useHashTag(false);
  const [localRegionTags, setLocalRegionTags] = useState([]);
  const [localThemeTags, setLocalThemeTags] = useState([]);
  const { searchByTag } = useSearchByTag({}, sortOption, currentPage, 4);

  const handleChangeTab = (tab) => {
    setCurrentPage(1);
    setSortOption(tab);
  };

  useEffect(() => {
    if (posts && posts.content) {
      setLocalPosts(posts.content);
      console.log('localPosts:', posts.content);
    }
  }, [posts]);

  useEffect(() => {
    if (regionTags) {
      setLocalRegionTags(regionTags);
    }
  }, [regionTags]);

  useEffect(() => {
    if (themeTags) {
      setLocalThemeTags(themeTags);
    }
  }, [themeTags]);

  const loadPostByTag = async (e) => {
    const tag = {
      name: e.target.innerText.replace('#', ''),
      city: pageState === '지역별 후기',
    };
    setLocalPosts(null);

    try {
      const data = await searchByTag(tag, sortOption, currentPage, 4);
      setLocalPosts(data.content);
      setPageState(e.target.innerText);
      console.log('localpost', localPosts, 'pagestate', pageState);
    } catch (err) {
      console.error('Failed to load posts by tag:', err);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  console.log(sortOption);
  return (
    <section className="min-h-screen mt-40 w-[840px] mx-auto flex flex-col text-title">
      <nav className="flex items-center justify-between w-full mb-8">
        <h1 className="searchResult text-3xl font-semibold">{pageState}</h1>
        <Input variant="searchInput" />
      </nav>
      <div className="flex flex-1 w-full mb-16">
        <div className="flex-1 pr-4 space-y-8">
          <Navigation
            routes={['최신순', '인기순']}
            onTabChange={handleChangeTab}
          >
            <>
              {localPosts === null ? (
                <Spinner />
              ) : localPosts.length ? (
                localPosts.map((localPost, index) => (
                  <PostCard
                    key={`${localPost.id}-${index}`}
                    contents={localPost}
                  />
                ))
              ) : (
                <NoData message="후기 게시물이 없습니다." />
              )}
            </>
          </Navigation>
          {localPosts !== null && localPosts.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPage={Math.ceil(
                posts ? posts.totalElements / posts.pageable.pageSize : 0,
              )}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        <div className="min-w-[40%] lg:min-w-[255px] max-w-min border-l border-t border-grey pl-8 pt-8 mt-[87px] max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-m mb-6">지역별 후기</h1>
              <div className="flex gap-3 flex-wrap">
                {localRegionTags.map((region) => (
                  <Button
                    variant="roundButton"
                    size="small"
                    key={region.id}
                    className={`text-xs px-2 ${pageState === `#${region.name}` ? 'bg-title text-white' : ''}`}
                    onClick={loadPostByTag}
                  >
                    #{region.name}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h1 className="font-medium text-m mb-6">테마별 후기</h1>
              <div className="flex gap-3 flex-wrap">
                {localThemeTags.map((theme) => (
                  <Button
                    variant="roundButton"
                    size="small"
                    key={theme.id}
                    className={`text-xs px-2 ${pageState === `#${theme.name}` ? 'bg-title text-white' : ''}`}
                    onClick={loadPostByTag}
                  >
                    #{theme.name}
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
