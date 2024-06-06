import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Button from '../commons/Button';
import axios from "axios";
import Pagination from "../commons/Pagination.jsx";
import useMembers from "../../Hooks/admin/useMembers.js";
import Spinner from "../commons/Spinner.jsx";
import NoData from "../../pages/Board/NoData.jsx";

const UserManagement = () => {

    const token = window.localStorage.getItem("accessToken");

    const [currentPage, setCurrentPage] = useState(0);
    const { members } = useMembers(
      currentPage - 1,
      10,
      token
    );
    const [localMembers, setLocalMembers] = useState(null);

    useEffect(() => {
      if (members && members.content) {
        setLocalMembers(members.content);
        console.log('localMembers:', members.content);
      }
    }, [members]);

    const handleDeleteMember = async (memberEmail) => {
        console.log("member.email : ", memberEmail);

        try {
            const response = await axios({
                url: `http://34.64.39.102:8080/api/admin/delete-member`,
                method: 'DELETE',
                params: { email: memberEmail },
                headers: {
                    Authorization: token,
                },
            });
            console.log("response: ", response);

            // 삭제 요청 후 getMemberData 함수 호출하여 데이터 새로 조회
            //await getMemberData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
    <div className=" flex flex-col">
      <div className="text-xl font-bold flex flex-wrap border-b border-grey p-2 mt-4 ">
        <div className="flex-1 text-center">num</div>
        <div className="flex-1 text-center">email</div>
        <div className="flex-1 text-center">nickname</div>
        <div className="flex-1 text-center">deletedAt</div>
        <div className="flex-1 text-center">status</div>
      </div>
        {localMembers === null ? (
          <Spinner />
        ) : localMembers.length ? (
          localMembers.map((localMember) => (
          <div key={localMember.id} className="flex flex-wrap items-center justify-around border-b border-grey p-2">
            <div className="flex-1 text-center">{localMember.id}</div>
            <div className="flex-1 text-center">
              <Link to={`/:1`}>{localMember.email}</Link></div>
            <div className="flex-1 text-center">{localMember.nickname}</div>
            <div className="flex-1 text-center">{localMember.deleteAt}</div>
            <div className="flex-1 text-center flex justify-between items-center">
                <div className="flex-1 text-center">{localMember.status}</div>
              <Button
                  variant={'nomalButton'}
                  size={'medium'}
                  className="text-center"
                  onClick={() => handleDeleteMember(localMember.email)}
              >탈퇴</Button></div>
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
    </div>
  );
};

export default UserManagement;
