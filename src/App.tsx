import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import { useReducer, useEffect, useMemo } from "react"
import { activiyReducer, initialState } from "./reducers/activityReducer"
import CalorieTracker from "./components/CalorieTracker"

function App() {

  const [state, dispatch] = useReducer(activiyReducer, initialState)

  useEffect(() =>{
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])

  return (
    <>

    <header className="bg-lime-600 py-3">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-center text-lg font-bold text-white uppercase">
          Contador de Calorias
        </h1>

        <button className="bg-gray-800 hover:bg-gray-900 uppercase font-bold text-sm cursor-pointer text-white p-1 rounded-lg disabled:opacity-10"
                disabled={!canRestartApp()}
                onClick={() => dispatch({type: 'restar-app'})}>
          Reiniciar App
        </button>

      </div>
    </header>

    <section className="bg-lime-500 py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <Form
          dispatch={dispatch}
          state={state}
        />
      </div>
    </section>

    <section className="bg-gray-800 py-10">
      <div className="max-w-4xl mx-auto">
        <CalorieTracker 
          activities={state.activities}
        />
      </div>
    </section>

    <section className="p-10 mx-auto max-w-4xl">
      <div className="max-w-4xl mx-auto">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </div>
    </section>

    </>
  )
}

export default App
