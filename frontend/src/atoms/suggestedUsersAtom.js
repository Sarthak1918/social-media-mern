import { atom } from "recoil";

const suggestedUsersAtom = atom(
    {
        key: 'suggestedUsersAtom',
        default: [],
    }
)

export default suggestedUsersAtom;