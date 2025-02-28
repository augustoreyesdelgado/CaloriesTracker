import { useMemo, Dispatch } from "react"
import { categories } from "../data/categories"
import { activity } from "../types"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { ActivityActions } from "../reducers/activityReducer"

type ActivityListProps = {
    activities: activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({activities, dispatch}: ActivityListProps){

    const categoryName = useMemo(() =>
        (category: activity['category']) => categories.map( cat => cat.id === category ? cat.name: ''), [activities])

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

    return(
        <>
        
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>

            {isEmptyActivities ? 
            <p className="text-center my-2 text-gray-500">Sin registros realizados</p> :
            activities.map( activity =>(
                <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow">

                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500': 'bg-orange-500'}`}>
                            {categoryName(+activity.category)}

                        </p>
                        <p className="font-bold">{activity.name}</p>
                        <p className="text-green-500 font-bold text-2xl">{activity.calories}{' '}
                            <span>Calorias</span></p>
                    </div>

                    <div className="flex gap-5 items-center">
                        <button onClick={() => dispatch({type: 'set-activeId', payload: {id: activity.id}})}>
                            <PencilSquareIcon
                                className="h-8 w-8 text-gray-800"
                            />
                        </button>
                        <button onClick={() => dispatch({type: 'delete-activity', payload: {id: activity.id}})}>
                            <XCircleIcon
                                className="h-8 w-8 text-red-500"
                            />
                        </button>
                    </div>

                </div>
            ))}

        </>
    )
}