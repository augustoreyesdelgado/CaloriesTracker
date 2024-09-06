import { useMemo } from 'react'
import { activity } from '../types'
import CalorieDisplay from './CalorieDisplay'

type CalorieTrackerProps = {
    activities: activity[]
}

export default function CalorieTracker({activities} : CalorieTrackerProps) {
  
    const caloriesConsumed = useMemo(()=> activities.reduce((total, activity)=>activity.category === 1 ?
                total+activity.calories : total, 0), [activities])
    const caloriesUsed = useMemo(()=> activities.reduce((total, activity)=>activity.category === 2 ?
                total+activity.calories : total, 0), [activities])
    const netCalories = useMemo(()=> caloriesConsumed-caloriesUsed, [activities])
  
    return (
    <>
    
        <h2 className='text-4xl font-black text-white text-center'>Resumen de calorias</h2>

        <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10'>
            <CalorieDisplay 
                calories={caloriesConsumed}
                text='Consumidas'
            />
            <CalorieDisplay 
                calories={caloriesUsed}
                text='Quemadas'
            />
            <CalorieDisplay 
                calories={netCalories}
                text={netCalories>=0 ? "Superavit Calorico" : "Deficit Calorico"}
            />
        </div>

    </>
  )
}
