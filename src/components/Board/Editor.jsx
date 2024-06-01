import React, { useMemo, useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);

export default function Editor() {
  const QuillRef = useRef(null);
  const [images, setImages] = useState([]);

  const handleImageUpload = async (file) => {
    try {
      const presignedUrlResponse = await fetch('http://34.64.39.102:8080/api/member/images', {
        method: 'PUT',
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          contentLength: file.size,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QxMjNAdGVzdC5jb20iLCJyb2xlIjoiUk9MRV9NRU1CRVIiLCJpYXQiOjE3MTcxNTkyMDksImV4cCI6MTcxNzE5NTIwOX0.pruR0omvgPX40zzNT_Ye2oaQrnPcdUJwcdK5Gf1C5Zw',
        },
      });

      if (!presignedUrlResponse.ok) {
        throw new Error('Failed to get presigned URL');
      }

      const presignedUrl = await presignedUrlResponse.text();

      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }

      return presignedUrl;
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
            console.log('Uploaded image URLs:', urls);
            setImages((prevImages) => [...prevImages, ...urls]);

            const range = QuillRef.current?.getEditor().getSelection()?.index;
            if (range !== null && range !== undefined) {
              const quill = QuillRef.current?.getEditor();
              urls.forEach((url) => {
                const imageUrlString = JSON.stringify(url);
                quill?.clipboard.dangerouslyPasteHTML(
                  range,
                  `<img src=${imageUrlString.slice(1, -1)} alt="이미지 태그가 삽입됩니다." />`,
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

  const [content, setContent] = useState('');
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
        <textarea
          className="border-none outline-none resize-none w-full h-10 text-3xl mt-10 leading-tight placeholder:opacity-80"
          type="text"
          placeholder="제목을 입력하세요."
          onChange={handleTitleChange}
        ></textarea>
        <ReactQuill
          ref={QuillRef}
          className="mt-2 mb-24 h-[440px]"
          modules={modules}
          onChange={setContent}
          placeholder="내용을 입력하세요..."
        />
      </div>
    </>
  );
}
