import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Certifique-se de importar o CSS

function EncryptDecryptApp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // Novo estado para armazenar o tipo de alerta

  // Função para lidar com a seleção do arquivo
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Função para esconder a mensagem após 3 segundos
  const hideMessageAfterDelay = () => {
    setTimeout(() => {
      setResponseMessage(''); // Apaga a mensagem após 3 segundos
      setAlertType(''); // Remove o tipo de alerta
    }, 3000);
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
        setAlertType('success'); // Definir tipo de alerta como sucesso
        console.log(response.data); // Aqui você pode processar a resposta (ex: baixar o arquivo)
        hideMessageAfterDelay();
      } catch (error) {
        setResponseMessage('Erro ao criptografar o arquivo.');
        setAlertType('error'); // Definir tipo de alerta como erro
        console.error(error);
        hideMessageAfterDelay();
      }
    } else {
      setResponseMessage('Por favor, selecione um arquivo.');
      setAlertType('error'); // Definir tipo de alerta como erro
      hideMessageAfterDelay();
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
        setAlertType('success'); // Definir tipo de alerta como sucesso
        console.log(response.data); // Aqui você pode processar a resposta (ex: baixar o arquivo)
        hideMessageAfterDelay();
      } catch (error) {
        setResponseMessage('Erro ao descriptografar o arquivo.');
        setAlertType('error'); // Definir tipo de alerta como erro
        console.error(error);
        hideMessageAfterDelay();
      }
    } else {
      setResponseMessage('Por favor, selecione um arquivo.');
      setAlertType('error'); // Definir tipo de alerta como erro
      hideMessageAfterDelay();
    }
  };

  return (
    <div className="container">
      <h1>Criptografia de Arquivos</h1>
      <input type="file" onChange={handleFileChange} accept=".txt" />
      <div className="buttons">
        <button onClick={handleEncrypt}>Criptografar</button>
        <button onClick={handleDecrypt}>Descriptografar</button>
      </div>
      {responseMessage && (
        <p className={`response-message ${alertType}`}>
          {responseMessage}
        </p>
      )}
    </div>
  );
}

export default EncryptDecryptApp;
