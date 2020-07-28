import { createStore, combineReducers} from "redux"

const reducers = combineReducers({
    numbers: function (state, action){
        return{
            Height: 0,
            Waist: 0,
            hip: 0,
            Neck: 0
        }
    },
    isMale: function(state,action){
        return true
    }
})

export default function storeConfig(){
    return createStore(reducers)
}