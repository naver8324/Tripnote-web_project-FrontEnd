import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Button from '../commons/Button';
import Pagination from "../commons/Pagination.jsx";
import useMembers from "../../Hooks/admin/useMembers.js";
import Spinner from "../commons/Spinner.jsx";
import NoData from "../../pages/Board/NoData.jsx";
import useDeleteMember from "../../Hooks/admin/useDeleteMember.js";
import {ToastAlert} from "../commons/ToastAlert.jsx";
import useRestoreMember from "../../Hooks/admin/useRestoreMember.js";

const UserManagement = () => {

    const token = window.localStorage.getItem("accessToken");

    const [currentPage, setCurrentPage] = useState(1);
    const { members, refetch } = useMembers(
      currentPage - 1,
      10,
      token
    );
    const [localMembers, setLocalMembers] = useState(null);
    const { deleteMember, loading: DeleteLoading, error: DeleteError } = useDeleteMember();
    const { restoreMember, loading: RestoreLoading, error: RestoreError } = useRestoreMember();
    const [ memberEmail, setMemberEmail] = useState(null);


    useEffect(() => {

      if (members && members.content) {
        setLocalMembers(members.content);
      }
    }, [members]);

    useEffect(() => {

        if (members && members.content) {
            refetch();
            setLocalMembers(members.content);
        }
    }, [memberEmail]);

    const handleDeleteMember = async (memberEmail) => {

        try {
            await deleteMember(memberEmail);
            setMemberEmail(memberEmail);
            console.log("response: ", 'Delete successful');
            ToastAlert(`관리자에 의해 ${memberEmail} 회원이 탈퇴되었습니다.`, 'success');

            // 삭제 요청 후 getMemberData 함수 호출하여 데이터 새로 조회
        } catch (error) {
            console.error('Delete member failed:', error);
        }
    }

    const handleRestoreMember = async (memberEmail) => {

        try {
            await restoreMember(memberEmail);
            setMemberEmail(memberEmail);
            console.log("response: ", 'Restore successful');
            ToastAlert(`관리자에 의해 ${memberEmail} 회원이 복구되었습니다.`, 'success');

            // 복구 요청 후 getMemberData 함수 호출하여 데이터 새로 조회
        } catch (error) {
            console.error('Restore member failed:', error);
        }
    }

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
    <div className=" flex flex-col">
      <div className="text-xl font-bold flex flex-wrap border-b border-grey p-2 mt-4 ">
        <div className="flex-[0.2] text-center">num</div>
        <div className="flex-1 text-center">email</div>
        <div className="flex-[0.5] text-center">nickname</div>
        <div className="flex-1 text-center">deletedAt</div>
        <div className="flex-1 text-center">status</div>
      </div>
        {localMembers === null ? (
          <Spinner />
        ) : localMembers.length ? (
          localMembers.map((localMember) => (
          <div key={localMember.id} className="flex flex-wrap items-center justify-around border-b border-grey p-2">
            <div className="flex-[0.2] text-center">{localMember.id}</div>
            <div className="flex-1 text-center">
              <Link to={`/:1`}>{localMember.email}</Link></div>
            <div className="flex-[0.5] text-center">{localMember.nickname}</div>
            <div className="flex-1 text-center">{localMember.deletedAt}</div>
            <div className="flex-1 text-center flex justify-between items-center">
            <div className="flex-1 text-center">{localMember.status}</div>

            {localMember.deletedAt === null ? (
              <Button
                variant={'nomalButton'}
                size={'medium'}
                className="text-center"
                onClick={() => handleDeleteMember(localMember.email)}
              >탈퇴</Button>
                ):(
              <Button
                variant={'nomalButton'}
                size={'medium'}
                className="text-center"
                onClick={() => handleRestoreMember(localMember.email)}
              >복구</Button>
                )}
            </div>
          </div>
          ))
      ) : (
        <NoData message="회원이 없습니다." />
      )}
        <Pagination
          currentPage={currentPage}
          totalPage={Math.ceil(
            members ? members.totalElements / members.pageable.pageSize : 5,
          )}
          onPageChange={handlePageChange}/>

        {DeleteError && (
            <p className="text-red-500">회원탈퇴 오류: {DeleteError}</p>
        )}
        {DeleteLoading && <p>회원 탈퇴 중...</p>}
        {RestoreError && (
            <p className="text-red-500">회원복구 오류: {RestoreError}</p>
        )}
        {RestoreLoading && <p>회원 복구 중...</p>}
    </div>
  );
};

export default UserManagement;
