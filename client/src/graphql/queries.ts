import { gql } from "@apollo/client";

export const getPersonBooks = gql`
  query GetPersonBooks($hardcoverOnly: Boolean) {
    people(hardcoverOnly: $hardcoverOnly) {
      name
      gender
      books {
        name
        type
      }
    }
  }
`;
