import { createStore, combineReducers} from "redux"

const reducers = combineReducers({
    numbers: function (state, action){
<<<<<<< HEAD
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
=======
        return{
            Height: 0,
            Waist: 0,
            hip: 0,
            Neck: 0
        },
    isMale: function(state,action){
        return true
    }
    }
>>>>>>> dd88b90d42e718346eda5842e5cb8ec20a3161c3
})

export default function storeConfig(){
    return createStore(reducers)
}