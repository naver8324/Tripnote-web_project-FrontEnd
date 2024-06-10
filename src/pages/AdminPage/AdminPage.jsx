import React from 'react';
import Tabs from '../../components/Tabs/Tabs';
import UserManagement from '../../components/AdminPage/UserManagement';
import HashtagManagement from '../../components/AdminPage/HashtagManagement';
import PostManagement from '../../components/AdminPage/PostManagement';
import CommentManagement from '../../components/AdminPage/CommentManagement';

export default function AdminPage() {
  return (
    <>
      <div className="m-50 min-w-[1200px] min-h-[800px] bg-white rounded-lg p-6 flex flex-col items-center">
        <div>
          <Tabs className="w-full flex justify-center">
            <Tabs.Tab index={0}>유저 관리</Tabs.Tab>
            <Tabs.Tab index={1}>해쉬태그 관리</Tabs.Tab>
            <Tabs.Tab index={2}>게시글 관리</Tabs.Tab>
            <Tabs.Tab index={3}>댓글 관리</Tabs.Tab>
          </Tabs>
        </div>
        <Tabs className="w-full mt-8">
          <Tabs.TabContent index={0}>
            <UserManagement />
          </Tabs.TabContent>
          <Tabs.TabContent index={1}>
            <HashtagManagement />
          </Tabs.TabContent>
          <Tabs.TabContent index={2}>
            <PostManagement />
          </Tabs.TabContent>
          <Tabs.TabContent index={3}>
            <CommentManagement />
          </Tabs.TabContent>
        </Tabs>
      </div>
    </>
  );
}
