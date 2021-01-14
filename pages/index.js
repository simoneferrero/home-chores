import { useEffect, useState } from 'react'
import useSWR from 'swr'

import Table from '../components/Table'

export default function Tasks() {
  const [completedTasks, setCompletedTasks] = useState([])

  useEffect(() => {
    const getCompletedTasks = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
  
      const response = await fetch(`/api/tasks`, requestOptions)
      const tasks = await response.json()
  
      setCompletedTasks(tasks)
    }

    getCompletedTasks()
  }, [])


  const completeTask = async (week, type) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ week, type })
    }

    const response = await fetch(`/api/tasks`, requestOptions)
    const newTask = await response.json()

    setCompletedTasks((previousTasks) => [...previousTasks, newTask])
  }

  const resetTask = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }

    const response = await fetch(`/api/tasks/${id}`, requestOptions)

    setCompletedTasks((previousTasks) => previousTasks.filter(({ _id }) => _id !== id))
  }

  return (
    <div>
      <Table completedTasks={completedTasks} handleCompleteTask={completeTask} handleResetTask={resetTask} />
    </div>
  );
}
