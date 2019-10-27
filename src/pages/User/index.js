import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Star,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

const User = ({ navigation }) => {
  const [stars, setStars] = useState([]);

  const user = navigation.getParam('user');

  useEffect(() => {
    async function loadUser() {
      const response = await api.get(`/users/${user.login}/starred`);

      setStars(response.data);
    }
    loadUser();
  }, []);

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      <Star
        data={stars}
        keyExtractor={star => `${star.id}`}
        renderItem={({ item }) => (
          <Starred>
            <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
      />
    </Container>
  );
};

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: propTypes.shape({
    getParam: propTypes.func,
  }).isRequired,
};

export default User;
