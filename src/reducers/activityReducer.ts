import { activity } from "../types"

export type ActivityActions = 
    { type: 'save-activity', payload: { newactivity: activity } } |
    { type: 'set-activeId', payload: { id: activity['id'] } } |
    { type: 'delete-activity', payload: { id: activity['id'] } } |
    { type: 'restar-app'}

export type ActivityState = {
    activities: activity[],
    activeId: activity['id']
}

const localStorgeActivities = () : activity[]=>{
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities):[]
}

export const initialState: ActivityState = {
    activities: localStorgeActivities(),
    activeId: ''
}

export const activiyReducer = (state: ActivityState = initialState, action: ActivityActions) =>{

    if(action.type === 'save-activity'){
        //Se maneja la logica para manejar el state
        //console.log(action.payload.newactivity)
        let updatedActivities: activity[] = []
        if(state.activeId){
            updatedActivities = state.activities.map( activity => activity.id === state.activeId ?
                action.payload.newactivity: activity )
        } else {
            updatedActivities = [...state.activities, action.payload.newactivity]
        }

        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if(action.type === 'set-activeId'){

        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity'){
        return {
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id)
        }
    }

    if(action.type === 'restar-app'){
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}