export const UPDATE_USER = `
    mutation UpdateUser ($user_id: String!, $email: String!, $password: String!, $alias: String!){
        updateUser(
            userId: $user_id
            userInput: {
            email: $email
            password: $password
            alias: $alias
            }
        ) {
            id
            email
            alias
            photoUrl
        }
    }
`;
