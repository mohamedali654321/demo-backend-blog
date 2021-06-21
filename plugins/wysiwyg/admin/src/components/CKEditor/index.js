import React from 'react';
import PropTypes from 'prop-types';

// import CKEditor  from 'ckeditor4-react-advanced';
//import ClassicEditor from '@akilli/ckeditor4-build-classic'
//import CKEditor from '@ckeditor/ckeditor5-react';
import '@ckeditor/ckeditor5-build-classic/build/translations/ar'
//import ClassicEditor from '@akilli/ckeditor4-build-classic'
import styled from 'styled-components';
import CKEDITOR from 'react-ckeditor-4';
import ClassicEditor from 'ckeditor5-build-full-plugins'
import CKEditor from 'ckeditor4-react-advanced'
const Wrapper = styled.div`
  .ck-editor__main {
    min-height: 200px;
    > div {
      min-height: 200px;
    }
  }
`;




// CKEditor.editorConfig = function( config ) {
  

// 	config.toolbarGroups = [
// 		{ name: 'document', items: [ 'Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates' ] },
// 		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
// 		{ name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
// 		{ name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
// 		'/',
// 		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
// 		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
// 		{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
// 		{ name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
// 		'/',
// 		{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
// 		{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
// 		{ name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
// 		{ name: 'about', items: [ 'About' ] }
// 	];
// };



// CKEDITOR.plugins.addExternal('youtube', '../../../../../../node_modules/ckeditor-youtube-plugin');
// config.extraPlugins = 'youtube';





const Editor = ({ onChange, name, value }) => {




 
const Change = (event ) => {
  const content = event.editor.getData();
  
 onChange({ target: { name, value: content } });
}
 
  
  return (
    <Wrapper>
      <CKEDITOR
           
         config={
           {
            language:'ar'
           }
           
          
          
             
      }
        content={value}
       
        events={{
          "change": Change
        }
          
        }
      />
    </Wrapper>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;