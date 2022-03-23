import React, { memo, useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { loadIdents } from '../redux/thunksCreators/identsAC';

function IdentsList({ setIdent }) {

  const emptyIdent = { ident: "Маршруты отсутствуют" }

  const { idents } = useSelector(state => state.dataReducer)
  const dispatch = useDispatch()
  useEffect(() => dispatch(loadIdents()), [])
  useEffect(() => setSelectedIdent(idents[0] || emptyIdent), [idents])

  const [selectedIdent, setSelectedIdent] = useState(emptyIdent)
  setIdent(selectedIdent)

  return (
    <div className="relative">
      <Listbox value={selectedIdent} onChange={setSelectedIdent}>
        <Listbox.Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center">{selectedIdent.ident}<svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></Listbox.Button>
        <Listbox.Options className="absolute mt-2 max-h-96 overflow-y-auto w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-md z-10 ">
          {idents.length > 0 &&
            idents.map((ident) => (
              <Listbox.Option
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                key={ident.id}
                value={ident}>
                {ident.ident}
              </Listbox.Option>
            ))
          }
        </Listbox.Options>
      </Listbox>
    </div>
  )
}

export default memo(IdentsList);
