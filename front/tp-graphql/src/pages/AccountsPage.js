import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ACCOUNT } from '../graphql/mutations';
import CompteList from '../components/compteList';

const AccountsPage = () => {
  const [solde, setSolde] = useState('');
  const [dateCreation, setDateCreation] = useState('');
  const [type, setType] = useState('COURANT');
  const [createAccount] = useMutation(CREATE_ACCOUNT);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAccount({
        variables: {
          compte: {
            solde: parseFloat(solde),
            dateCreation,
            type,
          },
        },
      });
      alert('Account created successfully');
      setSolde('');
      setDateCreation('');
      setType('COURANT');
    } catch (error) {
      console.error(error);
      alert('Failed to create account');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Accounts Management</h3>
      <div className="row">
        {/* Left Column: Form */}
        <div className="col-md-4 border p-4 rounded">
          <form onSubmit={handleSubmit} className="mb-4 ">
            <div className="mb-3">
              <label htmlFor="solde" className="form-label">Solde</label>
              <input
                type="number"
                id="solde"
                value={solde}
                onChange={(e) => setSolde(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateCreation" className="form-label">Date de création</label>
              <input
                type="date"
                id="dateCreation"
                value={dateCreation}
                onChange={(e) => setDateCreation(e.target.value)}
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
                <option value="COURANT">Courant</option>
                <option value="EPARGNE">Épargne</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Create Account</button>
          </form>
        </div>

        {/* Right Column: List */}
        <div className="col-md-8">
          <CompteList />
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
