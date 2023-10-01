import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loader'
import Error from '../components/Error'
// import 'antd/dist/antd.css'
import moment from 'moment'

import { DatePicker, Space } from 'antd'
const { RangePicker } = DatePicker

const HomeScreen = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [fromdate, setfromdate] = useState(
    moment(new Date()).format('DD-MM-YYYY')
  )
  const [todate, settodate] = useState(moment(new Date()).format('DD-MM-YYYY'))
  const [duplicateRooms, setDuplicateRooms] = useState()
  const [searchkey, setsearchkey] = useState('')
  const [type, settype] = useState('all ')

  function filterByDate (dates) {
    if (dates && dates.length === 2) {
      const fromtemp = moment(new Date(dates[0])).format('YYYY-MM-DD')
      const totemp = moment(new Date(dates[1])).format('YYYY-MM-DD')

      setfromdate(moment(new Date(dates[0])).format('DD-MM-YYYY'))
      settodate(moment(new Date(dates[1])).format('DD-MM-YYYY'))

      var temp = []
      for (var room of duplicateRooms) {
        var availability = true

        for (var booking of room.currentbookings) {
          const fromdatetemp = moment(booking.fromdate, 'DD-MM-YYYY').format(
            'YYYY-MM-DD'
          )
          const todatetemp = moment(booking.todate, 'DD-MM-YYYY').format(
            'YYYY-MM-DD'
          )
          if (room.currentbookings.length) {
            if (
              !moment(fromtemp).isBetween(fromdatetemp, todatetemp) &&
              !moment(totemp).isBetween(fromdatetemp, todatetemp) &&
              !moment(fromdatetemp).isBetween(fromtemp, totemp) &&
              !moment(todatetemp).isBetween(fromtemp, totemp)
            ) {
              if (
                fromtemp !== fromdatetemp &&
                totemp !== todatetemp &&
                fromtemp !== fromdatetemp &&
                totemp !== todatetemp
              ) {
                availability = false
              }
            }
          }
        }
        if (!availability || room.currentbookings.length === 0) {
          temp.push(room)
        }
        setRooms(temp)
      }
    } else {
      setRooms(duplicateRooms)
      setfromdate('')
      settodate('')
      if (searchkey !== '') {
        filterBySearch(searchkey)
      }
      if (type !== 'all') {
        filterByType(type)
      }
      console.log(rooms)
    }
  }
  useEffect(() => {
    async function fetchData () {
      try {
        setLoading(true)
        const data = (await axios.get('/api/rooms/getallrooms')).data
        setRooms(data.rooms)
        setDuplicateRooms(data.rooms)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  function filterBySearch () {
    const dupdate = duplicateRooms.filter(room =>
      room.name.toLowerCase().includes(searchkey)
    )
    setRooms(dupdate)
  }

  function filterByType (e) {
    settype(e)
    if (e !== 'all') {
      const dupdate = duplicateRooms.filter(
        room => room.type.toLowerCase() === e.toLowerCase()
      )
      setRooms(dupdate)
    } else {
      setRooms(duplicateRooms)
    }
  }

  return (
    <div className='container'>
      <div className='row mt-5 bs'>
        <div className='col-md-3 offset-1'>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
        <div className='col-md-3 offset-1'>
          <input
            type='text'
            className='form-control'
            placeholder='search rooms'
            value={searchkey}
            onChange={e => setsearchkey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className='col-md-3 offset-1'>
          <select
            className='form-control'
            value={type}
            onChange={e => {
              filterByType(e.target.value)
            }}
          >
            <option value='all'>All</option>
            <option value='delux'>Delux</option>
            <option value='non-delux'>Non-Delux</option>
          </select>
        </div>
      </div>
      <div className='row justify-content-center mt-5'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <>
            {rooms &&
              rooms.map(room => {
                return (
                  <div className='col-md-9 mt-2'>
                    <Room
                      key={room.id}
                      room={room}
                      fromdate={fromdate}
                      todate={todate}
                    />
                  </div>
                )
              })}
          </>
        )}
      </div>
    </div>
  )
}
export default HomeScreen
