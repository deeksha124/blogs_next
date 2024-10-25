// "use client"; // Add this line at the top

// import React, { useState, useRef, useMemo, useCallback } from 'react';
// import dynamic from 'next/dynamic';
// // import JoditEditor from 'jodit-react';
// const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

// const SlateEditor: React.FC<{ content: string; onChange: (content: string) => void }> = ({ content, onChange }) => {
//   const editor = useRef(null);
//   const [editorContent, setEditorContent] = useState(content);

//   const config:any = useMemo(() => {
//     return {
//       readonly: false,
//       toolbar: true,
//       placeholder: 'Start typing...',
//       showCharsCounter: false,
//       showWordsCounter: false,
//       showXPathInStatusbar: false,
//       toolbarButtonSize: 'small',
//     };
//   }, []);

//   const handleBlur = useCallback((newContent: string) => {
//     setEditorContent(newContent);
//     onChange(newContent);
//   }, [onChange]);

//   return (
//     <>
//       <JoditEditor
//         // Ref = {editor}
//         innerRef={editor}
//         value={editorContent}
//         config={config}
//          tabIndex={1} // tabIndex of textarea
//         onBlur={handleBlur} // use handleBlur to update the content
//          onChange={(newContent) => { /* You can handle real-time changes here if needed */ }}
//       />

//     </>
//   );
// };

// export default SlateEditor;

"use client"; // Add this line at the top

import React, { useState, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const SlateEditor: React.FC<{ content: string; onChange: (content: string) => void }> = ({ content, onChange }) => {
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState(content);

  const config: any = useMemo(() => {
    return {
      readonly: false,
      toolbar: true,
      placeholder: 'Start typing...',
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      toolbarButtonSize: 'small',
    };
  }, []);

  const handleBlur = useCallback((newContent: string) => {
    setEditorContent(newContent);
    onChange(newContent);
  }, [onChange]);

  return (
    <>
      <JoditEditor
        ref={editor} // Use ref instead of innerRef
        value={editorContent}
        config={config}
        onBlur={handleBlur} // use handleBlur to update the content
        onChange={(newContent) => { /* You can handle real-time changes here if needed */ }}
      />
    </>
  );
};

export default SlateEditor;
