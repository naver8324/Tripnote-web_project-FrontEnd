import React from 'react';
import Tabs from '../../components/Tabs/Tabs';
import UserManagement from '../../components/AdminPage/UserManagement';
import HashtagManagement from '../../components/AdminPage/HashtagManagement';
import PostCommentManagement from '../../components/AdminPage/PostCommentManagement';
import UserPostCommentManagement from '../../components/AdminPage/UserPostCommentManagement';

export default function AdminPage() {
  return (
    <>
      <div className="m-40 min-h-[1200px] bg-white rounded-lg p-6 flex flex-col items-center">
        <Tabs>
          <Tabs.Tab index={0}>유저 관리</Tabs.Tab>
          <Tabs.Tab index={1}>해쉬태그 관리</Tabs.Tab>
          <Tabs.Tab index={2}>전체 게시글/댓글 관리</Tabs.Tab>
          <Tabs.Tab index={3}>유저 게시글/댓글 관리</Tabs.Tab>
          <Tabs.TabContent index={0}>
            <UserManagement />
          </Tabs.TabContent>
          <Tabs.TabContent index={1}>
            <HashtagManagement />
          </Tabs.TabContent>
          <Tabs.TabContent index={2}>
            <PostCommentManagement />
          </Tabs.TabContent>
          <Tabs.TabContent index={3}>
            <UserPostCommentManagement />
          </Tabs.TabContent>
        </Tabs>
      </div>
    </>
  );
}
