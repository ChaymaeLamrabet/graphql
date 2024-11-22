import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TRANSACTION } from '../graphql/mutations';

const AddTransaction = ({ compteId }) => {
  const [montant, setMontant] = useState('');
  const [description, setDescription] = useState('');
  const [addTransaction] = useMutation(ADD_TRANSACTION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTransaction({
        variables: {
          compteId,
          request: {
            montant: parseFloat(montant),
            description,
            date: new Date().toISOString().split('T')[0], // Current date
          },
        },
      });
      alert('Transaction added successfully');
      setMontant('');
      setDescription('');
    } catch (error) {
      console.error(error);
      alert('Failed to add transaction');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
        placeholder="Montant"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransaction;
