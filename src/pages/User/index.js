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
  Loading,
} from './styles';

const User = ({ navigation }) => {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const user = navigation.getParam('user');

  async function load() {
    setLoading(true);
    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });

    setStars(page >= 2 ? [...stars, ...response.data] : response.data);
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    load();
  }, [page]);

  async function loadMore() {
    if (stars.length % 30 === 0) setPage(page + 1);
  }

  const refreshList = () => {
    setRefreshing(true);
    setStars([]);
    setPage(1);
    load();
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <Loading />;
  };

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
        onEndReachedThreshold={0.2}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReached={loadMore}
        ListFooterComponent={renderFooter}
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
