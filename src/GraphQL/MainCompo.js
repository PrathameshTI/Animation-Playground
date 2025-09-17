import React, {useCallback, useEffect} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {gql, useQuery} from '@apollo/client';

const COUNTRY_QUERY = gql`
  query CountryQuery {
    countries {
      name
      code
      capital
    }
  }
`;
export default function () {
  const {data, loading} = useQuery(COUNTRY_QUERY);
  console.log('data', loading, data);
  const renderData = useCallback(({item, index}) => (
    <View>
      <Text
        style={{
          color: '#000',
          fontSize: 18,
        }}>
        {item.name}
      </Text>
    </View>
  ));
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        gap: 15,
      }}>
      <Text
        style={{
          color: '#000',
          fontSize: 24,
        }}>
        GraphQL
      </Text>
      {loading ? (
        <Text
          style={{
            fontSize: 20,
            color: '#000',
            alignSelf: 'center',
            marginVertical: 50,
          }}>
          Loading...
        </Text>
      ) : (
        <FlatList data={data.countries} renderItem={renderData} />
      )}
    </View>
  );
}
