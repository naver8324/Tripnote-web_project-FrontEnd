import React, { useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
Quill.register('modules/ImageResize', ImageResize);

export default function Editor({ postTitle, postContent, setPostTitle, setPostContent }) {
  const QuillRef = useRef(null);
  const [images, setImages] = useState([]);
  // const { postDetail } = location?.state;
  // const [editTitle, setEditTitle] = useState(postDetail?.title);
  // const [editContent, setEditContent] = useState(postDetail?.content);

  const handleImageUpload = async (file) => {
    try {
      const token = localStorage.getItem('accessToken');
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const presignedUrlResponse = await axios.put(
        `${baseURL}api/member/images`,
        {
          fileName: file.name,
          contentType: file.type,
          contentLength: file.size,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (presignedUrlResponse.status !== 200) {
        throw new Error('Failed to get presigned URL');
      }

      const presignedUrlData = presignedUrlResponse.data;
      const { presignedUrl, key } = presignedUrlData;

      const uploadResponse = await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      if (uploadResponse.status !== 200) {
        throw new Error('Failed to upload image');
      }

      return presignedUrl.split('?')[0];
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        const promises = [];
        for (let i = 0; i < file.length; i++) {
          const imageUrl = await handleImageUpload(file[i]);
          if (imageUrl) {
            promises.push(imageUrl);
          }
        }

        Promise.all(promises)
          .then((urls) => {
            setImages((prevImages) => [...prevImages, ...urls]);

            const range = QuillRef.current?.getEditor().getSelection()?.index;
            if (range !== null && range !== undefined) {
              const quill = QuillRef.current?.getEditor();
              urls.forEach((url) => {
                quill?.clipboard.dangerouslyPasteHTML(
                  range,
                  `<img src="${url}" alt="이미지" />`,
                );
              });
            }
          })
          .catch((error) => {
            console.error('Error uploading images:', error);
          });
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['bold', 'underline'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import('parchment'),
      },
    }),
    [],
  );

  const handleTitleChange = (e) => {
    setPostTitle(e.currentTarget.value);
  };

  const handleContentChange = (value) => {
    setPostContent(value);
  };

  return (
    <>
      <div className="w-[840px] flex-col justify-center items-center">
        <textarea
          className="border-none outline-none resize-none w-full h-10 text-3xl mt-10 leading-tight placeholder:opacity-80"
          type="text"
          placeholder="제목을 입력하세요."
          onChange={handleTitleChange}
          value={postTitle}
        ></textarea>
        <ReactQuill
          ref={QuillRef}
          className="mt-2 mb-24 h-[440px]"
          modules={modules}
          placeholder="내용을 입력하세요..."
          onChange={handleContentChange}
          value={postContent}
        />
      </div>
    </>
  );
}