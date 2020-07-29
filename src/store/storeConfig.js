import { createStore, combineReducers} from "redux"

const reducers = combineReducers({
    numbers: function (state, action){
        console.log(action.type)
        switch(action.type){
            case "CHANGE_THE_STATE_OF_HEIGHT":
                return{
                    ...state,
                    Height: action.payload
                }
            case "CHANGE_THE_STATE_OF_NECK":
                return{
                    ...state,
                    Neck: action.payload
                }
            case "CHANGE_THE_STATE_OF_WAIST":
                return{
                    ...state,
                    Waist: action.payload
                }
            case "CHANGE_THE_STATE_OF_HIP":
                return{
                    ...state,
                    Hip: action.payload
                }
            default:
                return {
                    Height: 0,
                    Waist: 0,
                    Hip: 0,
                    Neck: 0
                }

            
        }
/*         homens
        495/(1.0324-.19077(log(cintura-pescoço)) +.15456(log(altura))) -450 (logaritmos em base 10)
        Mulheres
        495/(1.29579-.35004(log(cintura+quadril-pescoço)) +.22100(log(altura))) -450  */
    },
    
    isMale: function(state,action){
        return true
    }
    })

export default function storeConfig(){
    return createStore(reducers)
}