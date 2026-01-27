import { useEffect, useState } from 'react'
import api from './services/api'

function App() {
  const [apartamentos, setApartamentos] = useState([])
  const [numero, setNumero] = useState('')
  const [estado, setEstado] = useState('LIVRE')
  const [editId, setEditId] = useState(null)

  const carregarApartamentos = () => {
    api.get('/api/apartamento')
      .then(res => setApartamentos(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    carregarApartamentos()
  }, [])

  const salvarApartamento = () => {
    if (!numero) return


    if (editId) {
      api.put(`/api/apartamento/${editId}`, { numero, estado })
        .then(() => {
          resetForm()
          carregarApartamentos()
        })
    } else {
      api.post('/api/apartamento', { numero, estado })
        .then(() => {
          resetForm()
          carregarApartamentos()
        })
    }
  }
    const editarApartamento = (ap) => {
    setNumero(ap.numero)
    setEstado(ap.estado)
    setEditId(ap.id)
  }

  const removerApartamento = (id) => {
    api.delete(`/api/apartamento/${id}`)
      .then(() => carregarApartamentos())
  }

  const resetForm = () => {
    setNumero('')
    setEstado('LIVRE')
    setEditId(null)
  }

  return (
  <div
  style={{
    minHeight: '100vh',
    width: '100vw', 
    background: 'linear-gradient(135deg, #0b1425ff, #2a5298)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }}
>
  <div
    style={{
      width: '100%',
      maxWidth: 900,
      background: '#fff',
      borderRadius: 10,
      padding: 25,
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
    }}
  >
    <h1
      style={{
        textAlign: 'center',
        marginBottom: 25,
        color: '#2a5298'
      }}
    >
      Gerenciador de Apartamentos
    </h1>

    {}
    <div
      style={{
        marginBottom: 30,
        border: '1px solid #e0e0e0',
        padding: 12,
        borderRadius: 8,
        background: '#f9f9f9'
      }}
    >
      <input
          placeholder="Número do apartamento"
        value={numero}
        onChange={e => setNumero(e.target.value)}
            style={{
          width: '97%',
          padding: 10,
          marginBottom: 15,
          borderRadius: 5,
          border: '1px solid #ccc'
        }}
      />

      <select
        value={estado}
        onChange={e => setEstado(e.target.value)}
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 15,
          borderRadius: 5,
          border: '1px solid #ccc'
        }}
      >
        <option value="LIVRE">LIVRE</option>
        <option value="OCUPADO">OCUPADO</option>
        <option value="MANUTECAO">MANUTENÇÃO</option>
      </select>

      <button
        onClick={salvarApartamento}
        style={{
          padding: '10px 18px',
          background: '#37982aff',
          color: '#fff',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer'
        }}
      >
        {editId ? 'Atualizar' : 'Salvar'}
      </button>

      {editId && (
        <button
          onClick={resetForm}
          style={{
            padding: '10px 18px',
            marginLeft: 8,
            background: '#999',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer'
          }}
        >
          Cancelar
        </button>
      )}
    </div>

    {}
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 15
      }}
    >
      {apartamentos.map(ap => (
        <li
          key={ap.id}
          style={{
            border: '1px solid #ddd',
            padding: 15,
            borderRadius: 8,
            background: '#fafafa'
          }}
        >
          <strong style={{ color: '#2a5298' }}>
            Apartamento {ap.numero}
          </strong>

<div style={{ marginTop: 6 }}>
  Estado:{' '}
  <b
    style={{
      padding: '4px 8px',
      borderRadius: 6,
      fontWeight: 'bold',
      color:
        ap.estado === 'LIVRE'
          ? '#2e7d32'
          : ap.estado === 'MANUTECAO'
          ? '#ef6c00'
          : '#c62828',
      background:
        ap.estado === 'LIVRE'
          ? '#e8f5e9'
          : ap.estado === 'MANUTECAO'
          ? '#fff3e0'
          : '#fdecea',
      border:
        ap.estado === 'LIVRE'
          ? '1px solid #66bb6a'
          : ap.estado === 'MANUTECAO'
          ? '1px solid #ffb74d'
          : '1px solid #ef5350'
    }}
  >
    {ap.estado === 'MANUTECAO'
      ? 'MANUTENÇÃO'
      : ap.estado}
  </b>
</div>


          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => editarApartamento(ap)}
              style={{
                padding: '6px 12px',
                background: '#f0ad4e',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                color: '#fff'
              }}
            >
              Editar
            </button>

            <button
              onClick={() => removerApartamento(ap.id)}
              style={{
                padding: '6px 12px',
                marginLeft: 6,
                background: '#d9534f',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                color: '#fff'
              }}
            >
              Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>
)

}

export default App
