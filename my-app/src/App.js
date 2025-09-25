import logo from './logo.svg';
import './App.css';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'


function MyDropzone() {
  const [logs, setLogs] = React.useState([]);

  const addLog = (message) => {
    const logEntry = `${(new Date()).toISOString()}: ${message}`;
    setLogs(prevLogs => [...prevLogs, logEntry]);
    console.log(logEntry);
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      addLog(`Accepted file: ${file.name}`);
      const reader = new FileReader()

      reader.onabort = () => addLog('File reading was aborted')
      reader.onerror = () => addLog('File reading has failed')
      reader.onloadstart = () => addLog('File reading started')
      reader.onload = () => {
        addLog("Full loaded file")
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    onDropAccepted: (files, event) => {
      addLog("Drop Accepted");
    },
    onFileDialogOpen: () => {
      addLog("File Dialog Opened");
    },
  })

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div style={{marginTop: '20px', padding: '10px'}}>
        <h3>Logs:</h3>
        {logs.map((log, index) => (
          <div key={index} style={{fontFamily: 'monospace', fontSize: '12px', marginBottom: '5px'}}>
            {log}
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {MyDropzone()}
      </header>
    </div>
  );
}

export default App;
