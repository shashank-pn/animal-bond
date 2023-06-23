import { useGlobalContext } from "@/context/globalContext";
import { useRouter } from "next/router";

export default function Index() {
    const { user, setUserDetailsModal } = useGlobalContext();
    const router = useRouter();


    return (
        <>Welcome to home page</>
    );
}