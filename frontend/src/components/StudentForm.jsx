import { useState } from 'react';
import { ethers } from 'ethers';
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

      // Call smart contract with 10 ETH registration fee
      console.log('Submitting to blockchain...', formData);
      const tx = await contract.addStudent(
        formData.name,
        formData.regno,
        formData.clgname,
        formData.department,
        fileHash,
        {
          value: ethers.parseEther("10") // Send 10 ETH with transaction
        }
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

      <div style={styles.feeNotice}>
        <strong>💰 Registration Fee:</strong> 10 ETH will be deducted from your account for each registration
      </div>

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
    backgroundColor: 'var(--color-bg-card)',
    padding: '35px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow-lg)',
    marginBottom: '30px',
    border: '1px solid var(--color-border)',
  },
  title: {
    marginTop: 0,
    marginBottom: '20px',
    color: 'var(--color-text-primary)',
    fontSize: '24px',
    fontWeight: '700',
  },
  feeNotice: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    padding: '15px 18px',
    borderRadius: '8px',
    marginBottom: '25px',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    color: '#fbbf24',
    fontSize: '14px',
    lineHeight: '1.5',
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
    color: 'var(--color-text-primary)',
    fontSize: '15px',
  },
  input: {
    padding: '12px 14px',
    border: '2px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    borderRadius: '8px',
    fontSize: '15px',
    transition: 'border-color 0.2s ease',
    outline: 'none',
  },
  fileInput: {
    padding: '10px',
    border: '2px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  fileName: {
    fontSize: '13px',
    color: 'var(--color-primary)',
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
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: '18px',
    borderRadius: '8px',
    color: '#22c55e',
    border: '1px solid rgba(34, 197, 94, 0.3)',
  },
  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: '18px',
    borderRadius: '8px',
    color: '#ef4444',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
  link: {
    color: 'var(--color-primary)',
    wordBreak: 'break-all',
    fontWeight: '500',
  },
  txHash: {
    fontFamily: 'monospace',
    fontSize: '13px',
    wordBreak: 'break-all',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-secondary)',
    padding: '8px',
    borderRadius: '4px',
    margin: '8px 0 0 0',
  },
};

export default StudentForm;
