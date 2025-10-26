import { useState, useEffect } from 'react';

const StudentList = ({ contract, refresh }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (contract) {
      fetchStudents();
    }
  }, [contract, refresh]);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');

    try {
      console.log('Fetching students from blockchain...');
      const studentList = await contract.getAllStudents();
      console.log('Students fetched:', studentList);

      // Convert BigInt timestamps to numbers and format data
      const formattedStudents = studentList.map((student, index) => ({
        index: index + 1,
        name: student.name,
        regno: student.regno,
        clgname: student.clgname,
        department: student.department,
        fileHash: student.fileHash,
        timestamp: new Date(Number(student.timestamp) * 1000).toLocaleString(),
        submitter: student.submitter,
      }));

      setStudents(formattedStudents);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(err.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Registered Students</h2>
        <p style={styles.loading}>Loading students from blockchain...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Registered Students</h2>
        <div style={styles.error}>
          <p>Error: {error}</p>
          <button onClick={fetchStudents} style={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Registered Students</h2>
        <button onClick={fetchStudents} style={styles.refreshButton}>
          Refresh
        </button>
      </div>

      {students.length === 0 ? (
        <p style={styles.noData}>No students registered yet.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Reg No</th>
                <th style={styles.th}>College</th>
                <th style={styles.th}>Department</th>
                <th style={styles.th}>File Hash</th>
                <th style={styles.th}>Timestamp</th>
                <th style={styles.th}>Submitted By</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.index} style={styles.tr}>
                  <td style={styles.td}>{student.index}</td>
                  <td style={styles.td}>{student.name}</td>
                  <td style={styles.td}>{student.regno}</td>
                  <td style={styles.td}>{student.clgname}</td>
                  <td style={styles.td}>{student.department}</td>
                  <td style={styles.td}>
                    {student.fileHash ? (
                      <span style={styles.hash} title={student.fileHash}>
                        {student.fileHash.substring(0, 10)}...
                      </span>
                    ) : (
                      <span style={styles.noHash}>No file</span>
                    )}
                  </td>
                  <td style={styles.td}>{student.timestamp}</td>
                  <td style={styles.td}>
                    <span style={styles.address} title={student.submitter}>
                      {formatAddress(student.submitter)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={styles.footer}>
        <p style={styles.count}>Total Students: {students.length}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '35px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    border: '1px solid #e8eaf0',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  title: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '24px',
    fontWeight: '700',
  },
  refreshButton: {
    background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'transform 0.2s ease',
    boxShadow: '0 2px 6px rgba(82, 196, 26, 0.3)',
  },
  loading: {
    textAlign: 'center',
    color: '#667eea',
    padding: '40px',
    fontSize: '16px',
  },
  error: {
    backgroundColor: '#fff2f0',
    padding: '20px',
    borderRadius: '8px',
    color: '#cf1322',
    border: '1px solid #ffccc7',
  },
  retryButton: {
    backgroundColor: '#ff6b6b',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '12px',
    fontWeight: '600',
  },
  noData: {
    textAlign: 'center',
    color: '#8c8c8c',
    padding: '50px',
    fontSize: '16px',
  },
  tableContainer: {
    overflowX: 'auto',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
  },
  th: {
    backgroundColor: '#f8f9fa',
    padding: '14px 12px',
    textAlign: 'left',
    borderBottom: '2px solid #e8eaf0',
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tr: {
    borderBottom: '1px solid #f0f0f0',
    transition: 'background-color 0.2s ease',
  },
  td: {
    padding: '14px 12px',
    color: '#555',
    fontSize: '14px',
  },
  hash: {
    fontFamily: 'monospace',
    fontSize: '12px',
    backgroundColor: '#f0f7ff',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'help',
    color: '#667eea',
    fontWeight: '500',
  },
  noHash: {
    color: '#bfbfbf',
    fontStyle: 'italic',
    fontSize: '13px',
  },
  address: {
    fontFamily: 'monospace',
    fontSize: '12px',
    backgroundColor: '#f6ffed',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'help',
    color: '#52c41a',
    fontWeight: '500',
  },
  footer: {
    marginTop: '25px',
    paddingTop: '25px',
    borderTop: '2px solid #f0f0f0',
  },
  count: {
    fontWeight: '600',
    color: '#2c3e50',
    margin: 0,
    fontSize: '16px',
  },
};

export default StudentList;
