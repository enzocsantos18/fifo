import React, { useContext } from 'react';
import { Container } from './styles';

interface IProps {
    imageURL?: string;
    username: string;
}

const ProfileAvatar: React.FC<IProps> = ({ imageURL, username }) => {
    const usernameParts = username?.split(' ');
    let shortUsername = '';

    function getFirstLetterToUpper(str: string) {
        return str[0].toUpperCase();
    }

    if (usernameParts.length > 1) {
        shortUsername = `${getFirstLetterToUpper(
            usernameParts[0]
        )}${getFirstLetterToUpper(usernameParts[1])}`;
    } else {
        shortUsername = `${getFirstLetterToUpper(usernameParts[0])}`;
    }

    return <Container>{imageURL ? <img src={imageURL} /> : <p>{shortUsername}</p>}</Container>;
};

export default ProfileAvatar;
