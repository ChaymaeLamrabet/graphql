import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ACCOUNTS } from '../graphql/queries';

const CompteList = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-4">
      <h3>Accounts</h3>
      <div className="row">
        {data.allComptes.map((compte, index) => (
          <div key={compte.id} className="col-md-4 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <div className="card-body">
                <h5 className="card-title">Account number {compte.id}</h5>
                <p className="card-text">
                  Votre solde: {compte.solde} <br />
                  ({compte.type})
                </p>
                <div className=" d-flex">
                {/* Left-aligned Button */}
                <a href="#" className="btn btn-primary  ">
                  Edit
                </a>

                {/* Right-aligned Button */}
                <a href="#" className="btn btn-danger ms-3">
                  Delete
                </a>
              </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompteList;
