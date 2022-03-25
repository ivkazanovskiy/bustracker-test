import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query'
import axios from 'axios'

import IdentsList from './IdentsList';
import { loadIdents } from '../redux/thunksCreators/identsAC';
import RouteInfo from './RouteInfo';
import { setDelay, stopDelay } from '../redux/actionCreators/userAC';

function Home(props) {

  const dispatch = useDispatch()
  useEffect(() => dispatch(loadIdents()), [])

  const dateRef = useRef()
  const identRef = useRef()
  const setIdent = useCallback((ident) => {
    identRef.current = ident
    routQuery.reset()
  }, [])

  const routQuery = useMutation((params) => {
    dispatch(setDelay())
    setTimeout(() => dispatch(stopDelay()), 1000)
    return axios(`/api/routes?${params}`)
  })

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4 max-w-3xl md:gap-8">
      <div className="flex justify-between flex-col gap-2 md:flex-row md:gap-0">
        <IdentsList setIdent={setIdent} />
        <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-44 pl-10 p-2.5" ref={dateRef} defaultValue="2019-09-30" onChange={() => routQuery.reset()} />
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:w-44 px-5 py-2.5 text-center " onClick={() => {
          const data = {
            identId: identRef.current.id,
            date: dateRef.current.value
          }
          const params = (new URLSearchParams(data)).toString()
          routQuery.mutate(params)
        }}
        >Загрузить</button>
      </div>
      <RouteInfo routQuery={routQuery} />
    </div>
  );
}

export default Home;
