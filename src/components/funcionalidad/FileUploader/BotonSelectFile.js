import React from 'react'

function BotonSelectFile(props) {

    
    return (
        <span className='selectFileButton'>
        <input
            id={props.id}
            name={props.name}
            type="file"
            accept="image/*"
            onChange={props.onChange}
            multiple={props.multiple}            
            hidden
        />
        <span onClick={() => {
            global.document.getElementById(`${props.id}`).click();
        }}>
            {props.button}
        </span>
    </span>
    );
}

BotonSelectFile.defaultProps = {
    button: <button>Elije una imagen</button>,
    multiple: false,
};

export default BotonSelectFile;
