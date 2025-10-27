import { useState } from 'react';
import { calculateFileHash } from '../utils/web3';

const StudentForm = ({ contract, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    regno: '',
    clgname: '',
    department: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [txHash, setTxHash] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTxHash('');

    try {
      // Validate form
      if (!formData.name || !formData.regno || !formData.clgname || !formData.department) {
        throw new Error('All fields are required');
      }

      // Calculate file hash
      let fileHash = '';
      if (file) {
        fileHash = await calculateFileHash(file);
        console.log('File hash:', fileHash);
      }

      // Call smart contract
      console.log('Submitting to blockchain...', formData);
      const tx = await contract.addStudent(
        formData.name,
        formData.regno,
        formData.clgname,
        formData.department,
        fileHash
      );

      console.log('Transaction sent:', tx.hash);
      setTxHash(tx.hash);

      // Wait for transaction to be mined
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);

      // Reset form
      setFormData({
        name: '',
        regno: '',
        clgname: '',
        department: '',
      });
      setFile(null);
      document.getElementById('fileInput').value = '';

      alert('Student registered successfully on blockchain!');
      if (onSuccess) onSuccess();

    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Failed to submit student data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register Student</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Enter student name"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Registration Number *</label>
          <input
            type="text"
            name="regno"
            value={formData.regno}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Enter registration number"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>College Name *</label>
          <input
            type="text"
            name="clgname"
            value={formData.clgname}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Enter college name"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Department *</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Enter department"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Upload File (Optional)</label>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            style={styles.fileInput}
          />
          {file && (
            <p style={styles.fileName}>Selected: {file.name}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Submitting to Blockchain...' : 'Register Student'}
        </button>

        {txHash && (
          <div style={styles.success}>
            <p><strong>Transaction Hash:</strong></p>
            <p style={styles.txHash}>{txHash}</p>
          </div>
        )}

        {error && (
          <div style={styles.error}>
            <p>Error: {error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '35px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    marginBottom: '30px',
    border: '1px solid #e8eaf0',
  },
  title: {
    marginTop: 0,
    marginBottom: '25px',
    color: '#2c3e50',
    fontSize: '24px',
    fontWeight: '700',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontWeight: '600',
    color: '#34495e',
    fontSize: '15px',
  },
  input: {
    padding: '12px 14px',
    border: '2px solid #e1e4e8',
    borderRadius: '8px',
    fontSize: '15px',
    transition: 'border-color 0.2s ease',
    outline: 'none',
  },
  fileInput: {
    padding: '10px',
    border: '2px solid #e1e4e8',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
  },
  fileName: {
    fontSize: '13px',
    color: '#667eea',
    margin: 0,
    fontWeight: '500',
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '16px 32px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 8px rgba(102, 126, 234, 0.3)',
  },
  success: {
    backgroundColor: '#d4edda',
    padding: '18px',
    borderRadius: '8px',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  error: {
    backgroundColor: '#f8d7da',
    padding: '18px',
    borderRadius: '8px',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
  link: {
    color: '#667eea',
    wordBreak: 'break-all',
    fontWeight: '500',
  },
  txHash: {
    fontFamily: 'monospace',
    fontSize: '13px',
    wordBreak: 'break-all',
    backgroundColor: '#f8f9fa',
    padding: '8px',
    borderRadius: '4px',
    margin: '8px 0 0 0',
  },
};

export default StudentForm;
