import React, {createContext, useContext, useEffect, useState} from "react";
import UserDetailsForm from "@/components/user-details-form";
import moment from "moment";

export const GlobalContext = createContext({user: null, life: null});

export const GlobalProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [life, setLife] = useState({
        dob: null,
        expectedYears: 0,
        progress: 0.00,
        spentWeeks: 0,
        remainingWeeks: 0,
        totalWeeks: 0,

    });
    const [isLoading, setLoading] = useState(true);
    const [userDetailsModal, setUserDetailsModal] = useState(false);

    const makeState = (userData) => {
        setUser({...userData});
        const startDate = userData.dob;
        const currentDate = new Date();
        const endDate = new Date(startDate);
        endDate.setFullYear(startDate.getFullYear() + userData.expectedLife);
    
        const weeksSpent = moment(currentDate).diff(moment(startDate), 'weeks');
        const weeksRemaining = moment(endDate).diff(moment(currentDate), 'weeks');
        const totalWeeks = weeksSpent + weeksRemaining;
    
        const progress = (weeksSpent / totalWeeks) * 100;
    
        setLife({
            dob: startDate,
            expectedYears: userData.expectedLife,
            progress: progress.toFixed(2),
            spentWeeks: weeksSpent,
            remainingWeeks: weeksRemaining,
            totalWeeks: totalWeeks,
            currentDate: currentDate,
            endDate: endDate
        });
        setLoading(false);
    }

    useEffect(() => {
        const __userdata = {
            firstName: 'Emma',
            lastName: 'Watson',
            dob: new Date('02-20-2000'),
            expectedLife: 80,
        }
        let userdata = null;
        try {
            userdata = localStorage.getItem('user');
            userdata = JSON.parse(userdata);
            if(userdata == null){
                throw Error('Invalid User')
            }
            userdata.dob = new Date(userdata?.dob);
            makeState(userdata)
        } catch (e) {
            console.error(e);
            localStorage.removeItem('user');
        }
    }, []);

    const context = {
        user: user,
        life: life,
        isLoading: isLoading,
        userDetailsModal,
        setUserDetailsModal,
        makeState,
    }
    return (
        <GlobalContext.Provider value={context}>
            {children}
            <UserDetailsForm open={userDetailsModal} setOpen={setUserDetailsModal}/>
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context == null)
        throw Error("Invalid use of Global Context");
    return context;

}
