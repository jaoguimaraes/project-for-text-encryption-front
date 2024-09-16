import React, { useState } from 'react';
import axios from 'axios';

function EncryptDecryptApp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  // Função para lidar com a seleção do arquivo
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Função para enviar o arquivo para criptografar
  const handleEncrypt = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      try {
        const response = await axios.post('http://localhost:3005/encrypt', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setResponseMessage('Arquivo criptografado com sucesso!');
        console.log(response.data); // Aqui você pode processar a resposta (ex: baixar o arquivo) 
      } catch (error) {
        setResponseMessage('Erro ao criptografar o arquivo.');
        console.error(error);
      }
    } else {
      setResponseMessage('Por favor, selecione um arquivo.');
    }
  };

  // Função para enviar o arquivo para descriptografar
  const handleDecrypt = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      try {
        const response = await axios.post('http://localhost:3005/decrypt', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setResponseMessage('Arquivo descriptografado com sucesso!');
        console.log(response.data); // Aqui você pode processar a resposta (ex: baixar o arquivo)
      } catch (error) {
        setResponseMessage('Erro ao descriptografar o arquivo.');
        console.error(error);
      }
    } else {
      setResponseMessage('Por favor, selecione um arquivo.');
    }
  };

  return (
    <div>
      <h1>Criptografia de Arquivos</h1>
      <input type="file" onChange={handleFileChange} accept=".txt" />
      <div>
        <button onClick={handleEncrypt}>Criptografar</button>
        <button onClick={handleDecrypt}>Descriptografar</button>
      </div>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default EncryptDecryptApp;
