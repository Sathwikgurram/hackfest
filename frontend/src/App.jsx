import React, { useEffect, useState } from 'react'
import { api } from './api'
import Groups from './components/Groups'
import Members from './components/Members'
import Events from './components/Events'
import Expenses from './components/Expenses'
import Balances from './components/Balances'
import Settlements from './components/Settlements'

export default function App(){
  const [page, setPage] = useState('groups')
  const [selectedGroup, setSelectedGroup] = useState(null)

  useEffect(()=>{
    if(!selectedGroup) setPage('groups')
  },[selectedGroup])

  return (
    <div className="container">
      <h1>Hackfest Dashboard</h1>
      <div className="nav">
        <button onClick={()=>setPage('groups')}>Groups</button>
        <button onClick={()=>setPage('members')} disabled={!selectedGroup}>Members</button>
        <button onClick={()=>setPage('events')} disabled={!selectedGroup}>Events</button>
        <button onClick={()=>setPage('expenses')} disabled={!selectedGroup}>Expenses</button>
        <button onClick={()=>setPage('balances')} disabled={!selectedGroup}>Balances</button>
        <button onClick={()=>setPage('settlements')} disabled={!selectedGroup}>Settlements</button>
      </div>

      <div className="grid">
        <div>
          <Groups onSelectGroup={(g)=>{ setSelectedGroup(g); setPage('members') }} selectedGroup={selectedGroup} />
        </div>
        <div>
          {page === 'members' && <Members group={selectedGroup} />}
          {page === 'events' && <Events group={selectedGroup} />}
          {page === 'expenses' && <Expenses group={selectedGroup} />}
          {page === 'balances' && <Balances group={selectedGroup} />}
          {page === 'settlements' && <Settlements group={selectedGroup} />}
          {page === 'groups' && <div className="small">Select or create a group to get started.</div>}
        </div>
      </div>
    </div>
  )
}
