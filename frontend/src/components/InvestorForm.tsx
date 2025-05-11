import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface DocumentData {
  id: number;
  file_name: string;
  file_path: string;
}
interface InvestorData {
  id?: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  street_address: string;
  state: string;
  zip_code: string;
  documents?: DocumentData[];
}

const InvestorForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const [formDataState, setFormDataState] = React.useState<InvestorData>({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone_number: '',
    street_address: '',
    state: '',
    zip_code: '',
    documents: []
  });
  const [removeFileIds, setRemoveFileIds] = React.useState<number[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:3000/api/investors/${id}`)
        .then(res => res.json())
        .then(data => setFormDataState({ ...data, documents: data.documents }));
    }
  }, [id, isEdit]);

  const processFilePath: (string) => string = (str) => str.replace(/(.*)\/public\/(.*)/, "/public/$2");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState({ ...formDataState, [e.target.name]: e.target.value });
  };

  const toggleRemoveFile = (fileId: number) => {
    setRemoveFileIds(prev =>
      prev.includes(fileId) ? prev.filter(fid => fid !== fileId) : [...prev, fileId]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    // append investor fields
    ['first_name','last_name','date_of_birth','phone_number','street_address','state','zip_code'].forEach(key => {
      formData.append(`investor[${key}]`, (formDataState as any)[key]);
    });
    // append file removals
    removeFileIds.forEach(fid => formData.append('remove_file_ids[]', fid.toString()));
    // append new files
    if (fileInputRef.current?.files) {
      Array.from(fileInputRef.current.files).forEach(file => {
        formData.append('files[]', file);
      });
    }

    const url = isEdit
      ? `http://localhost:3000/api/investors/${id}`
      : 'http://localhost:3000/api/investors';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, { method, body: formData });
    if (res.ok) navigate('/');
    else {
      const error = await res.json();
      alert('Error: ' + (error.errors || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div><label>First Name:</label>
        <input name="first_name" type="text" required value={formDataState.first_name} onChange={handleChange} />
      </div>
      <div><label>Last Name:</label>
        <input name="last_name" type="text" required value={formDataState.last_name} onChange={handleChange} />
      </div>
      <div><label>Date of Birth:</label>
        <input name="date_of_birth" type="date" required value={formDataState.date_of_birth} onChange={handleChange} />
      </div>
      <div><label>Phone Number:</label>
        <input name="phone_number" type="tel" required value={formDataState.phone_number} onChange={handleChange} />
      </div>
      <div><label>Street Address:</label>
        <input name="street_address" type="text" required value={formDataState.street_address} onChange={handleChange} />
      </div>
      <div><label>State:</label>
        <input name="state" type="text" required value={formDataState.state} onChange={handleChange} />
      </div>
      <div><label>Zip Code:</label>
        <input name="zip_code" type="text" required value={formDataState.zip_code} onChange={handleChange} />
      </div>
      {isEdit && formDataState.documents && (
        <div>
          <h4>Existing Documents</h4>
          {formDataState.documents.map(doc => (
            <div key={doc.id}>
              <label>
                <input type="checkbox" checked={!removeFileIds.includes(doc.id)} onChange={() => toggleRemoveFile(doc.id)} /> Keep {doc.file_name}
              </label>
              <a href={processFilePath(doc.file_path)} target="_blank" rel="noopener noreferrer">View</a>
            </div>
          ))}
        </div>
      )}
      <div><label>Upload New Documents:</label>
        <input ref={fileInputRef} type="file" multiple />
      </div>
      <button type="submit">{isEdit ? 'Update Investor' : 'Add Investor'}</button>
      <button onClick={() => navigate("/")}>Cancel</button>
    </form>
  );
};

export default InvestorForm;