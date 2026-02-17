import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function Events({ group }){
  const [events, setEvents] = useState([])
  const [title, setTitle] = useState('')

  useEffect(()=>{ if(group) load() },[group])

  async function load(){
    try{ const data = await api.listEvents(group.id); setEvents(data) }catch(e){ alert(e.message) }
  }

  async function create(){
    if(!title) return alert('title required')
    try{ const ev = await api.createEvent({ title, group_id: group.id }); setEvents([ev, ...events]); setTitle('') }catch(e){ alert(e.message) }
  }

  if(!group) return <div className="small">No group selected</div>

  return (
    <div>
      <h3>Events — {group.name}</h3>
      <div>
        <input placeholder="Event title" value={title} onChange={e=>setTitle(e.target.value)} />
        <button onClick={create}>Create Event</button>
      </div>
      <table>
        <thead><tr><th>Title</th></tr></thead>
        <tbody>
          {events.map(ev=> (
            <tr key={ev.id}><td>{ev.title}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
