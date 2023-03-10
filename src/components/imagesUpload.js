import React from 'react';
import ImageUploading from 'react-images-uploading';

export default function UploadImages(props) {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
        if (props.ImagesChange && typeof (props.ImagesChange) == 'function')
            props.ImagesChange(imageList);
    };

    return (
        <div className=" border border-2 m-2 p-2 border-secondary">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div>
                        <button
                            className='btn btn-primary m-2 mb-3 rounded-1 '
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </button>
                        &nbsp;
                        <button className='btn btn-danger m-2 mb-3 rounded-1 '
                            onClick={onImageRemoveAll}>Remove all images</button>
                        <div className='row'>
                            {imageList.map((image, index) => (
                                <div key={index} className="col-3">
                                    <img src={image['data_url']} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                        <button className='btn btn-secondary  my-2 rounded-1 ' onClick={() => onImageUpdate(index)}>Update</button>
                                        <button  className='btn btn-danger ms-1 rounded-1 ' onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}