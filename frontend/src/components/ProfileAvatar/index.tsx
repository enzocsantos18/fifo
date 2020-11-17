import React from 'react';
import { Container } from './styles';

interface IProps {
    imageURL?: string;
}

const ProfileAvatar: React.FC<IProps> = ({ imageURL}) => {
  return (
  <Container>
      {imageURL && <img src={imageURL} />}
      
      </Container>)
}

export default ProfileAvatar;