import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import MainCompo from './MainCompo';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/graphql',
  cache: new InMemoryCache(),
});

export default function () {
  return (
    <ApolloProvider client={client}>
      <View
        style={{
          flex: 1,
        }}>
        <MainCompo />
      </View>
    </ApolloProvider>
  );
}
