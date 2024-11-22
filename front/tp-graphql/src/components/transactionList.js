import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TRANSACTIONS } from '../graphql/queries';

const TransactionList = () => {
  const { loading, error, data } = useQuery(GET_ALL_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading transactions</p>;

  return (
    <div className="container mt-4">
      <h3>All Transactions</h3>
      <div className="row">
        {data.allTransactions.map((transaction) => (
          <div key={transaction.id} className="col-md-6 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <div className="card-body">
                <h5 className="card-title text-center">Transaction #{transaction.id}</h5>
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td><strong>Montant:</strong></td>
                      <td>{transaction.montant}</td>
                    </tr>
                    <tr>
                      <td><strong>Description:</strong></td>
                      <td>{transaction.description}</td>
                    </tr>
                    <tr>
                      <td><strong>Date:</strong></td>
                      <td>{transaction.date}</td>
                    </tr>
                    <tr>
                      <td><strong>Compte ID:</strong></td>
                      <td>{transaction.compte.id}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex ">
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-danger ms-3">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
