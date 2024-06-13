import React, { useEffect, useState } from 'react';
import Input from '../../components/commons/Input';
import Button from '../../components/commons/Button';
import Navigation from '../../components/Board/Navigation';
import PostCard from '../../components/Board/PostCard';
import { useNavigate } from 'react-router-dom';
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
  const [localPosts, setLocalPosts] = useState(null);
  const { Hashtags: regionTags } = useHashTag(true);
  const { Hashtags: themeTags } = useHashTag(false);
  const [localRegionTags, setLocalRegionTags] = useState([]);
  const [localThemeTags, setLocalThemeTags] = useState([]);
  const { searchByTag, responseData, loading } = useSearchByTag();

  useEffect(() => {
    if (responseData && responseData.content) {
      setLocalPosts(responseData.content);
      console.log('localPosts:', responseData.content);
    }
  }, [responseData]);

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

  const loadPostByTag = async (tagName, sortOptionOverride, pageOverride) => {
    const tag = {
      name: tagName || pageState.substring(1),
      city: pageState === '지역별 후기',
    };
    setLocalPosts(null);

    try {
      const data = await searchByTag(tag, sortOptionOverride || sortOption, pageOverride || currentPage, 4);
      setLocalPosts(data.content);
      setPageState(`#${tag.name}`);
      console.log('sort', sortOptionOverride, 'pagestate', pageState);
    } catch (err) {
      console.error('Failed to load posts by tag:', err);
    }
  };

  const handleChangeTab = (tab) => {
    setSortOption(tab);
    setCurrentPage(1);
    loadPostByTag(pageState.startsWith('#') ? pageState.substring(1) : null, tab, 1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    loadPostByTag(pageState.startsWith('#') ? pageState.substring(1) : null, sortOption, page);
  };

  useEffect(() => {
    loadPostByTag(pageState.startsWith('#') ? pageState.substring(1) : null, sortOption, currentPage);
  }, [currentPage, sortOption]);

  const handleTagClick = (e, tagName) => {
    setSortOption('최신순');
    setCurrentPage(1);
    loadPostByTag(tagName, '최신순', 1);
  };

  const totalPage = responseData ? Math.ceil(responseData.totalElements / 4) : 0;

  return (
    <section className="min-h-screen mt-40 w-[840px] mx-auto flex flex-col text-title">
      <nav className="flex items-center justify-between w-full mb-8">
        <h1 className="searchResult text-3xl font-semibold">{pageState}</h1>
        {/* <Input variant="searchInput" /> */}
      </nav>
      <div className="flex flex-1 w-full mb-16">
        <div className="flex-1 pr-4 space-y-8">
          <Navigation
            routes={['최신순', '인기순']}
            onTabChange={handleChangeTab}
          >
            <>
              {loading ? (
                <Spinner />
              ) : Array.isArray(localPosts) && localPosts.length ? (
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
              totalPage={totalPage}
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
                    onClick={(e) => handleTagClick(e, region.name)}
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
                    onClick={(e) => handleTagClick(e, theme.name)}
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