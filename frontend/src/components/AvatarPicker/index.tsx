import React, { useState, useRef, useEffect } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import { Wrapper, Container, CameraButton } from './styles';
import { useField } from '@unform/core';

export interface IAvatarPickerChangeEvent {
    image: File | null;
    imageSrc: string;
}

interface IProps {
    name?: string;
    defaultValue?: string;
    onChange?(event: IAvatarPickerChangeEvent): void;
}

const AvatarPicker: React.FC<IProps> = ({ name = 'image', defaultValue, onChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File | null>(null);
    const [imageSrc, setImageSrc] = useState('');
    const { fieldName, registerField, error, clearError } = useField(name);

    const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

    function handleImageLoad(e: React.ChangeEvent<HTMLInputElement>) {
        if (e!.target.files!.length === 0) return;

        const imageFile = e.target.files![0];

        if (imageFile.size > MAX_IMAGE_SIZE) {
            alert('A imagem não pode ser superior a 2MB!');
            return;
        }

        const imageObjectURL = URL.createObjectURL(imageFile);

        setImageSrc(imageObjectURL);
        setImage(imageFile);

        if (onChange) onChange({ image: imageFile, imageSrc: imageObjectURL });
    }

    function handleClick() {
        clearError();
        fileInputRef.current?.click();
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => {
                return image;
            },
        });
    }, [fieldName, registerField, image]);

    useEffect(() => {
        if (defaultValue) {
            setImageSrc(defaultValue);
        }
    }, [defaultValue]);

    return (
        <Wrapper>
            <Container onClick={handleClick}>
                <CameraButton>
                    <MdCameraAlt size={20} />
                </CameraButton>
                {imageSrc !== '' ? (
                    <img src={imageSrc} />
                ) : (
                    <p>
                        Adicionar foto <br /> (opcional)
                    </p>
                )}
                <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    name='image'
                    onChange={handleImageLoad}
                    style={{ display: 'none' }}
                />
            </Container>

            {error && <span className='error'>{error}</span>}
        </Wrapper>
    );
};

export default AvatarPicker;
