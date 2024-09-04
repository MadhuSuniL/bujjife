import React, { useState } from 'react';
import { MdDownload, MdNoteAlt } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setIsNotesOpen } from '../../redux/Slice';

const Notes = ({
    isNotesOpen,
}) => {

  const dispatch = useDispatch()
  const setIsNotesOpenState = () => dispatch(setIsNotesOpen())

  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const editorModules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']                                         
    ],
  };

  const editorFormats = [
    'header', 'font',
    'list', 'bullet',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'color', 'background',
    'link', 'image'
  ];

  return (
    <>
      <div
        className={`flex flex-col fixed top-0 right-0 h-full w-80 lg:w-96 text-sm bg-[#121418] transform transition-transform duration-300 z-10 ${
          isNotesOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex-0 p-2 text-[#F9801D]">
          <div onClick={setIsNotesOpenState} className='flex cp p-2 hover:bg-gray-900 rounded-lg justify-end items-center'>
              <h1 className='text-main text-lg font-main font-extrabold'>Notes</h1>
          </div>
          <p className='text-gray-700 flex'><MdNoteAlt className='mx-1' size={20}/> Capture, organize notes from responses, with rich text, customizable themes.</p>    
        </div>
        <div className='p-2 flex-1 overflow-auto'>
            <input name='title' type='text' className='w-full p-2 bg-transparent px-5 font-main border-none outline-none mb-2' placeholder='Title...'/>
            <div className="">
              {/* <ReactQuill
                value={editorContent}
                onChange={handleEditorChange}
                modules={editorModules}
                formats={editorFormats}
                theme="snow"
                className="text-[#F9801D] border-orange-500"
              /> */}
            </div>
        </div>
        <div className='flex-0'>
          <div className='flex justify-end my-1 mx-3'>
            <button onClick={setIsNotesOpenState} className='p-2 bg-transparent text-white rounded-full flex-shrink-0'>
              <h1 className='text-gray-700 text-md font-main font-extrabold'>Close</h1>
            </button>
            <button className='p-2 bg-transparent text-white rounded-full flex-shrink-0'>
              <h1 className='text-main text-md font-main font-extrabold flex i-c'><MdDownload size={20} className='icon-color'/> Download</h1>
            </button>
          </div>
        </div>
      </div>
      {isNotesOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={setIsNotesOpenState}
        />
      )}
    </>
  );
};

export default Notes;
