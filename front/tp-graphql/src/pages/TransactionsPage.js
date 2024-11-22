import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TRANSACTION } from '../graphql/mutations';
import TransactionList from '../components/transactionList';

const TransactionsPage = () => {
  const [montant, setMontant] = useState('');
  const [description, setDescription] = useState('');
  const [compteId, setCompteId] = useState('');
  const [addTransaction] = useMutation(ADD_TRANSACTION);
  const [type, setType] = useState('DEPOT');
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTransaction({
        variables: {
          compteId: parseInt(compteId, 10),
          request: {
            montant: parseFloat(montant),
            description,
          },
        },
      });
      alert('Transaction added successfully');
      setMontant('');
      setDescription('');
      setCompteId('');
    } catch (error) {
      console.error(error);
      alert('Failed to add transaction');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Transactions Management</h3>
      <div className="row">
        {/* Left Column: Form */}
        <div className="col-md-4 border p-4 rounded">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="montant" className="form-label">Montant</label>
              <input
                type="number"
                id="montant"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-select"
              >
                <option value="DEPOT">DEPOT</option>
                <option value="RETRAIT">RETRAIT</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="compteId" className="form-label">Compte ID</label>
              <input
                type="number"
                id="compteId"
                value={compteId}
                onChange={(e) => setCompteId(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Add Transaction</button>
          </form>
        </div>

        {/* Right Column: List */}
        <div className="col-md-8">
          <TransactionList />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
