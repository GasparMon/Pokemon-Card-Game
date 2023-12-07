import { match } from "./action_types";
import { BUTTON_ACTIVE, BUTTON_INACTIVE, CHANGE, CLEAN, FILL, MATCH, SUCCESS, VALIDATION } from "./types";

const initialState = {
  full: [],
  match: [],
  success: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FILL:
      return {
        ...state,
        full: [...state.full, action.payload],
      };

    case SUCCESS:
      return {
        ...state,
        success: [...state.success, action.payload],
      };

    case BUTTON_ACTIVE:

    const active = state.full.map((element) => {

      return{
        ...element,
        buttonActive:true
      }
    })

    return{
      ...state,
      full: active
    }

    case BUTTON_INACTIVE:

    const inactive = state.full.map((element) => {

      return{
        ...element,
        buttonActive:false
      }
    })

    return{
      ...state,
      full: inactive
    }

    case MATCH:
      if (state.match.length < 2) {
        return {
          ...state,
          match: [...state.match, action.payload],
        };
      }

    case CHANGE:
      const full_change = state.full.map((element) => {
        if (element.position === action.payload.position) {
          return {
            ...element,
            status: true,
          };
        }

        return element;
      });
      return {
        ...state,
        full: full_change,
      };

      case VALIDATION:

      if (state.match.length === 2) {
       
        const validation = state.match.map((element) => element)

        if(validation[0].id !== validation[1].id){

            const full_change = state.full.map((element) => {

                if (element.position === state.match[0].position || element.position === state.match[1].position) {
                  return {
                    ...element,
                    status: false,
                  };
                }
              
                return element;
              });

              return{
                ...state,
                full: full_change,
                match: []
              }
        } else {



            return{
                ...state,
                match:[],
                success:[...state.success, validation[0], validation[1]]
            }
        }
        
      }

      case CLEAN:

      return{
        ...state,
        full: [],
        success: []
      }

    default:
      return {
        ...state,
      };
  }
}
