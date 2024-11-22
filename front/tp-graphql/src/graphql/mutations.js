import { gql } from '@apollo/client';

// Mutation to save a new account
export const CREATE_ACCOUNT = gql`
  mutation SaveCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

// Mutation to delete an account
export const DELETE_ACCOUNT = gql`
  mutation DeleteCompte($id: ID!) {
    deleteCompte(id: $id) {
      id
      solde
      dateCreation
      type
    }
  }
`;

// Mutation to add a transaction for a specific account
export const ADD_TRANSACTION = gql`
  mutation AddTransaction($compteId: ID!, $request: TransactionRequest!) {
    addTransaction(compteId: $compteId, request: $request) {
      id
      montant
      description
      date
      compte {
        id
      }
    }
  }
`;
