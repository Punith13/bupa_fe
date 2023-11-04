export const getPersonBooks = /* GraphQL */ `
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
