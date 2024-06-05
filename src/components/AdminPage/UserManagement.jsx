import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Button from '../commons/Button';
import axios from "axios";

const UserManagement = () => {

    const token = window.localStorage.getItem("accessToken");

    const [MemberData, setMemberData] = useState([]);

    const getMemberData = async () => {
        try {

            // 로그인 성공 후 멤버 데이터 가져오기
            const getMembers = await axios({
                url: `http://34.64.39.102:8080/api/admin/members`,
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            });
            console.log("setMemberData = ", getMembers.data.content);
            setMemberData(getMembers.data.content);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getMemberData();
    }, []);

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
            await getMemberData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
    <div className=" flex flex-col">
      <div className="text-xl font-bold flex flex-wrap border-b border-grey p-2 mt-4 ">
        <div className="flex-1 text-center">num</div>
        <div className="flex-1 text-center">email</div>
        <div className="flex-1 text-center">nickname</div>
        <div className="flex-1 text-center">deletedAt</div>
        <div className="flex-1 text-center">status</div>
      </div>
        {MemberData.length > 0 ? (
          MemberData.map((member) => (
          <div key={member.id} className="flex flex-wrap items-center justify-around border-b border-grey p-2">
            <div className="flex-1 text-center">{member.id}</div>
            <div className="flex-1 text-center">
              <Link to={`/:1`}>{member.email}</Link></div>
            <div className="flex-1 text-center">{member.nickname}</div>
            <div className="flex-1 text-center">{member.deleteAt}</div>
            <div className="flex-1 text-center flex justify-between items-center">
                <div className="flex-1 text-center">{member.status}</div>
              <Button
                  variant={'nomalButton'}
                  size={'medium'}
                  className="text-center"
                  onClick={() => handleDeleteMember(member.email)}
              >탈퇴</Button></div>
          </div>
          ))
      ): (
            <div>Loading...</div>)}
    </div>
  );
};

export default UserManagement;
