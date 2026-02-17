import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function Groups({ onSelectGroup, selectedGroup }){
  const [groups, setGroups] = useState([])
  const [name, setName] = useState('')

  useEffect(()=>{ load() },[])

  async function load(){
    try{ const data = await api.listGroups(); setGroups(data) }catch(e){ alert(e.message) }
  }

  async function create(){
    if(!name) return alert('name required')
    try{ const g = await api.createGroup({ name, created_by: 'web' }); setGroups([g, ...groups]); setName('') }catch(e){ alert(e.message) }
  }

  async function remove(id){
    if(!confirm('Delete this group? This cannot be undone.')) return
    try{
      await api.deleteGroup(id)
      setGroups(groups.filter(g=>g.id!==id))
      if(selectedGroup && selectedGroup.id===id) onSelectGroup(null)
    }catch(e){ alert(e.message) }
  }

  return (
    <div>
      <h3>Groups</h3>
      <div>
        <input placeholder="Group name" value={name} onChange={e=>setName(e.target.value)} />
        <button onClick={create}>Create</button>
      </div>
      <table>
        <thead><tr><th>Name</th><th>Action</th></tr></thead>
        <tbody>
          {groups.map(g=> (
            <tr key={g.id} style={{background: selectedGroup && selectedGroup.id===g.id? '#f0fff4':''}}>
              <td>{g.name}</td>
              <td style={{display:'flex',gap:8}}>
                <button onClick={()=>onSelectGroup(g)}>Select</button>
                <button onClick={()=>remove(g.id)} style={{background:'#fee2e2', border:'1px solid #fecaca'}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
