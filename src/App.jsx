import { useState,useEffect } from 'react'

function App() {
  const [datas, setDatas] = useState("")
  const [tanggal, setTanggal] = useState("")
  const [materi, setMateri] = useState("")

  const remove = (id) => {
    fetch(`https://bimbingan-backend-production.up.railway.app/delete/${id}`,{
      method:"delete"
    })
  }
  
  const post = () => {
    fetch(`https://bimbingan-backend-production.up.railway.app/post`,{
      method:"post",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        tanggal:tanggal,
        bimbingan:materi
      })
  })}
  
  useEffect(() => {
    fetch("https://bimbingan-backend-production.up.railway.app/")
    .then(res => res.json())
    .then(result => setDatas(result.data))
  },[remove,post])
  
  return (
    <div className="p-3 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <input type="text" placeholder="Masukkan tanggal bimbingan" value={tanggal} onChange={e => setTanggal(e.target.value)} className="border-2 rounded border-black p-1"/>
          <input type="text" placeholder="Masukkan materi bimbingan" value={materi} onChange={e => setMateri(e.target.value)} className="border-2 rounded border-black p-1"/>
        </div>
        <div>
          <button className="bg-blue-400 px-4 py-2 rounded font-bold" onClick={
          () => {
            post()
            setTanggal("")
            setMateri("")
          }}>SUBMIT</button>
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {
          (datas.length>0) ? datas.map(data => {
            return (
            <li>
              <div className="flex justify-between pr-3 items-center">
                <div className="flex items-center gap-2">
                  <input type="checkbox"/>
                  <label>{data.tanggal}</label>
                </div>
                <div>
                  <button className="bg-red-600 text-white w-7 h-7 flex items-center justify-center rounded" onClick={() => remove(data.tanggal)}>X</button>
                </div>
              </div>
              <div>
                <p>{data.bimbingan}</p>
              </div>
            </li>
            )
          }) : <h1>Data tidak ada</h1>
        }
      </ul>
    </div>
  )
}

export default App
