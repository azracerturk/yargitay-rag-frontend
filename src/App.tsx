import { useState } from 'react'
import './App.css'

interface Kaynak {
  baslik: string
  kaynak_url: string
}

interface CevapSonucu {
  soru: string
  cevap: string
  kaynaklar: Kaynak[]
}

function App() {
  const [soru, setSoru] = useState('')
  const [sonuc, setSonuc] = useState<CevapSonucu | null>(null)
  const [yukleniyor, setYukleniyor] = useState(false)
  const [hata, setHata] = useState('')

  const API_URL = import.meta.env.VITE_API_URL

  const soruSor = async () => {
    if (!soru.trim()) return

    setYukleniyor(true)
    setHata('')
    setSonuc(null)

    try {
      const response = await fetch(API_URL + '/sor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ soru, limit: 5 }),
      })

      if (!response.ok) {
        throw new Error('Sunucu hatasi: ' + response.status)
      }

      const data: CevapSonucu = await response.json()
      setSonuc(data)
    } catch (err) {
      setHata('Bir hata olustu. Backend calisiyor mu kontrol edin.')
      console.error(err)
    } finally {
      setYukleniyor(false)
    }
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
      <h1>Yargitay Kararlari Soru-Cevap</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={soru}
          onChange={(e) => setSoru(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && soruSor()}
          placeholder="Sorunuzu yazin..."
          style={{ width: '80%', padding: '0.5rem', fontSize: '1rem' }}
        />
        <button
          onClick={soruSor}
          disabled={yukleniyor}
          style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginLeft: '0.5rem' }}
        >
          {yukleniyor ? 'Araniyor...' : 'Sor'}
        </button>
      </div>

      {hata && <p style={{ color: 'red' }}>{hata}</p>}

      {sonuc && (
        <div style={{ textAlign: 'left', marginTop: '2rem' }}>
          <h3>Cevap</h3>
          <p>{sonuc.cevap}</p>

          <h3>Kaynaklar</h3>
          <ul>
            {sonuc.kaynaklar.map((k, i) => (
              <li key={i}>
                <a href={k.kaynak_url} target="_blank" rel="noopener noreferrer">
                  {k.baslik}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
