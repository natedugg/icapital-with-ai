import React from 'react';
import { Link } from 'react-router-dom';

interface DocumentData {
  id: number;
  file_name: string;
  file_path: string;
}
interface Investor {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  street_address: string;
  state: string;
  zip_code: string;
  documents: DocumentData[];
}

const InvestorList: React.FC = () => {
  const [investors, setInvestors] = React.useState<Investor[]>([]);

  React.useEffect(() => {
    fetch('http://localhost:3000/api/investors')
      .then(res => res.json())
      .then(data => setInvestors(data));
  }, []);

  const processFilePath: (string) => string = (str) => str.replace(/(.*)\/public\/(.*)/, "/public/$2");

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>Investors</h1>
      <Link to="/investors/add">Add New Investor</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Address</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Files</th>
          </tr>
        </thead>
        <tbody>
          {investors.map(inv => (
            <tr key={inv.id}>
              <td>
                <Link to={`/investors/${inv.id}`}>{inv.first_name} {inv.last_name}</Link>
              </td>
              <td>{inv.date_of_birth}</td>
              <td>{inv.phone_number}</td>
              <td>{inv.street_address}</td>
              <td>{inv.state}</td>
              <td>{inv.zip_code}</td>
              <td>
                {inv.documents?.map(doc => (
                  <div key={doc.id}>
                    <a href={processFilePath(doc.file_path)} target="_blank" rel="noopener noreferrer">
                      {doc.file_name}
                    </a>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestorList;