import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { LAUNCH_TILE_DATA } from './launches';
import { Loading, Header, LaunchDetail, LaunchTile } from '../components';
import { ActionButton } from '../containers';

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      id
      site
      isBooked
      rocket {
        id
        name
        type
      }
      mission {
        name
        missionPatch
      }
    }
  }
`;
/*
export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      isInCart @client
      site
      rocket {
        type
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;
*/

export default function Launch({ launchId }) {
  const { data, loading, error } = useQuery(GET_LAUNCH_DETAILS, {
    variables: { launchId },
  });
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  console.log('Launch data', data);
  console.log('LaunchDetails', GET_LAUNCH_DETAILS);

  return (
    <Fragment>
      <Header image={data.launch.mission.missionPatch}>
        {data.launch.mission.name}
      </Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </Fragment>
  );
}

/*
<Header image={data.launch.mission.missionPatch}>
        {data.launch.mission.name}
      </Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
*/
