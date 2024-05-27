import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import Input from '../commons/Input';

export default function Editor() {
  const modules = {
    toolbar: {
      container: [
        ['image'],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold', 'underline'],
      ],
    },
  };
  const [content, setContent] = useState('');
  console.log(content);
  const [title, setTitle] = useState('');
  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };
  const handleSubmit = async () => {
    const date = new Date();
    try {
      await createPost({
        title: title,
        content,
        date,
      }).then((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex-col justify-center items-center">
        <Input
          className="border-none outline-none text-3xl mt-4 "
          type="text"
          placeholder="제목을 입력하세요."
          onChange={handleTitleChange}
        />
        <ReactQuill
          className="mt-2 mb-24 h-[440px]"
          modules={modules}
          onChange={setContent}
          placeholder="내용을 입력하세요..."
        />
      </div>
    </>
  );
}
