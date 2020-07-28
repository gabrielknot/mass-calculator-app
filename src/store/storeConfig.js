import { createStore, combineReducers} from "redux"

const reducers = combineReducers({
    numbers: function (state, action){
        console.log("aaaaaaaaaaa")
        return{
            Height: 0,
            Waist: 0,
            Hip: 0,
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