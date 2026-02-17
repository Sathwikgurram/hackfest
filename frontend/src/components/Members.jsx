import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function Members({ group }){
  const [members, setMembers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(()=>{ if(group) load() },[group])

  async function load(){
    try{ const data = await api.listMembers(group.id); setMembers(data) }catch(e){ alert(e.message) }
  }

  async function create(){
    if(!name) return alert('name required')
    try{ const m = await api.createMember({ name, email, group_id: group.id }); setMembers([m, ...members]); setName(''); setEmail('') }catch(e){ alert(e.message) }
  }

  if(!group) return <div className="small">No group selected</div>

  return (
    <div>
      <h3>Members — {group.name}</h3>
      <div>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button onClick={create}>Add Member</button>
      </div>
      <table>
        <thead><tr><th>Name</th><th>Email</th></tr></thead>
        <tbody>
          {members.map(m=> (
            <tr key={m.id}><td>{m.name}</td><td>{m.email}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
