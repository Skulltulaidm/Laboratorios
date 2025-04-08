import { useState } from 'react'
import CryptoJS from 'crypto-js'
import './App.css'

function App() {
    const [input, setInput] = useState('')
    const [textoCifrado, setTextoCifrado] = useState('')
    const [textoDescifrado, setTextoDescifrado] = useState('')

    const cifrar = () => {
        const cifrado = CryptoJS.AES.encrypt(input, 'secreto').toString()
        setTextoCifrado(cifrado)
    }

    const descifrar = () => {
        const bytes = CryptoJS.AES.decrypt(textoCifrado, 'secreto')
        const original = bytes.toString(CryptoJS.enc.Utf8)
        setTextoDescifrado(original)
    }

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Cifrado AES</h1>

            <label htmlFor="texto">Texto a cifrar:</label><br />
            <input
                id="texto"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
            /><br />

            <button onClick={cifrar} style={{ marginRight: '1rem' }}>Cifrar</button>
            <button onClick={descifrar}>Descifrar</button>

            <div style={{ marginTop: '1.5rem' }}>
                <p><strong>Texto Cifrado:</strong> {textoCifrado}</p>
                <p><strong>Texto Descifrado:</strong> {textoDescifrado}</p>
            </div>
        </div>
    )
}

export default App
